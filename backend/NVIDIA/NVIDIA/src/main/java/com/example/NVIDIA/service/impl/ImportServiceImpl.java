package com.example.NVIDIA.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.dto.ImportDTO;
import com.example.NVIDIA.dto.ImportItemDTO;
import com.example.NVIDIA.mapper.ImportDTOMapper;
import com.example.NVIDIA.model.Import;
import com.example.NVIDIA.model.ImportItem;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.repository.ImportRepository;
import com.example.NVIDIA.repository.ManufacturerRepository;
import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.service.ImportService;

@Service
public class ImportServiceImpl implements ImportService{
    @Autowired
    private ImportRepository importRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ManufacturerRepository manufacturerRepository;
    
    @Autowired
    private ImportDTOMapper mapper;

    private Double calTotal(Import model){
        Double sum = 0d;
        
        for (var importItem : model.getImportItems()) {
            sum += importItem.getTotal();
        }

        return sum;
    }

    @Override
    public ImportDTO getById(Long id) {
        Import model = importRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Cant found import with id: " + id)
        );

        return mapper.apply(model);
    }

    @Override
    public List<ImportDTO> getAll() {
        return importRepository.findAll().stream()
                    .map(model -> mapper.apply(model)).collect(Collectors.toList());
    }

    //POST
    private List<ImportItem> getImportItemModels(List<ImportItemDTO> importItems, ImportDTO importDTO) throws RuntimeException{
        List<Long> productIdList = importItems.stream()
                                    .map(importItem -> importItem.getProduct().getId())
                                    .collect(Collectors.toList());
                                    
        HashMap<Long, Product> mp = new HashMap<>();
        productRepository.findAllById(productIdList).stream()
                            .map(product -> {
                                    mp.put(product.getId(), product);
                                    return product;
                                }
                            ).collect(Collectors.toList());

                                    
        List<Product> products = new ArrayList<>();
        List<ImportItem> result = new ArrayList<>();
        
        for (var importItemDTO : importItems) {
            Long productId = importItemDTO.getProduct().getId();
            Product product = mp.get(productId);
            
            if (importItemDTO.getQuantity() == 0 || importItemDTO.getPrice() == 0){
                throw new RuntimeException("Price or Quantity cant be 0");
            }
            
            if (importItemDTO.getPrice() >= product.getUnitPrice()){
                throw new RuntimeException("Import price cant be lower than Product price");
            }

            int newQuantity = product.getUnitInStock() + importItemDTO.getQuantity();
            product.setUnitInStock(newQuantity);

            ImportItem importItem = new ImportItem();
            importItem.setPrice(importItemDTO.getPrice());
            importItem.setQuantity(importItemDTO.getQuantity());
            importItem.setTotal(importItem.getPrice() * importItem.getQuantity());
            importItem.setProduct(product);

            products.add(product);
            result.add(importItem);
        }

        productRepository.saveAll(products);

        mp.clear();
        products.clear();
        return result;
    }

    @Override
    public ImportDTO create(ImportDTO importDTO) {
        Import model = new Import();
        model.setManufacturer(manufacturerRepository.findById(importDTO.getManufacturer().getId())
                                .orElseThrow(() -> new RuntimeException("Cant found Manufacturer with id: " + importDTO.getManufacturer().getId())));
       
        if (importDTO.getDateImport() == null){
            model.setDateImport(new Date());
        }
        else model.setDateImport(importDTO.getDateImport());

        List<ImportItemDTO> importItems = importDTO.getImportItems();

        List<ImportItem> importItemList;
        try{
            importItemList = getImportItemModels(importItems, importDTO);
        }
        catch (Exception ignore){
            return null;
        }
        model.setImportItems(importItemList);
        model.setTotal(calTotal(model));
        
        var result = importRepository.save(model);
        return mapper.apply(result);
    }

    @Override
    public ImportDTO update(Long id, ImportDTO importDTO) {
        Import model = importRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Cant found Import with id: " + id)
        );

        if (importDTO.getDateImport() != null){
            model.setDateImport(importDTO.getDateImport());
        }

        List<ImportItem> importItems = model.getImportItems();
        List<ImportItemDTO> importItemDTOs = importDTO.getImportItems();

        int i = 0;

        while (i < importItems.size()) {
            ImportItem importItem = importItems.get(i);
            ImportItemDTO input = importItemDTOs.get(i);

            if (input.getPrice() == 0) return null;

            importItem.setPrice(input.getPrice());
            importItem.setTotal(input.getPrice() * importItem.getQuantity());

            i++;
        }
        
        model.setTotal(calTotal(model));

        var result = importRepository.save(model);
        return mapper.apply(result);
    }
}