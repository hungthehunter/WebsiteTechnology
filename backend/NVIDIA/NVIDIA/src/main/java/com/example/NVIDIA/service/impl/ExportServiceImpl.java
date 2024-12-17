package com.example.NVIDIA.service.impl;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.ExportDTO;
import com.example.NVIDIA.mapper.ExportDTOMapper;
import com.example.NVIDIA.model.Export;
import com.example.NVIDIA.model.Order;
import com.example.NVIDIA.model.ProcessingStates;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.repository.ExportRepository;
import com.example.NVIDIA.repository.OrderRepository;
import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.service.ExportService;

@Service
public class ExportServiceImpl implements ExportService {
    @Autowired
    private ExportRepository exportRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ExportDTOMapper mapper;

    @Override
    public ExportDTO getById(Long id) {
        Export export = exportRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Cant found Export with id: " + id));

        return mapper.apply(export);
    }

    @Override
    public List<ExportDTO> getAll() {
        return exportRepository.findAll().stream()
                .map(export -> mapper.apply(export)).collect(Collectors.toList());
    }

    // POST
    private void decreaseUnitInStock(Order order) throws RuntimeException {
        List<Product> products = new ArrayList<>();

        for (var item : order.getOrderItem()) {
            Long id = item.getProduct().getId();
            var product = productRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Cant found Product with id: " + id));

            int newQuantity = product.getUnitInStock() - item.getQuanitty();
            if (newQuantity < 0)
                throw new RuntimeException("Not enough stock");

            product.setUnitInStock(newQuantity);
            products.add(product);
        }

        productRepository.saveAll(products);
        products.clear();
    }

    @Override
    public ExportDTO create(ExportDTO exportDTO) {
        Export model = new Export();

        if (exportDTO.getDateExport() == null) {
            model.setDateExport(new Date());
        } else {
            model.setDateExport(exportDTO.getDateExport());
        }

        var order = orderRepository.findById(exportDTO.getOrder().getId())
                .orElseThrow(() -> new RuntimeException("Cant found order with id: " + exportDTO.getOrder().getId()));

        decreaseUnitInStock(order);
        order.setOrder_status(ProcessingStates.InProgress);
        
        order = orderRepository.save(order);
        
        model.setOrder(order);
        
        Export result = exportRepository.save(model);
        return mapper.apply(result);
    }

    @Override
    public ExportDTO update(Long id, ExportDTO exportDTO) {
        Export model = exportRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Cant found Export with id: " + id));

        if (exportDTO.getDateExport() != null) {
            model.setDateExport(exportDTO.getDateExport());
        }

        Export result = exportRepository.save(model);
        return mapper.apply(result);
    }
}
