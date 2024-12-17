package com.example.NVIDIA.mapper;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.BasicProductDTO;
import com.example.NVIDIA.dto.ImportItemDTO;
import com.example.NVIDIA.model.ImportItem;
import com.example.NVIDIA.model.Product;

@Component
public class ImportItemDTOMapper implements Function<ImportItem, ImportItemDTO> {
    @Override
    public ImportItemDTO apply(ImportItem importItem) {
        Product product = importItem.getProduct();

        BasicProductDTO basicProductDTO = new BasicProductDTO();
        basicProductDTO.setId(product.getId());
        basicProductDTO.setProductName(product.getProductName());
        basicProductDTO.setProduct_image(product.getProduct_image());
        basicProductDTO.setStatus(product.isStatus());
        basicProductDTO.setUnitInStock(product.getUnitInStock());
        basicProductDTO.setUnitInOrder(product.getUnitInOrder());
        basicProductDTO.setUnitPrice(product.getUnitPrice());

        return new ImportItemDTO(
            importItem.getId(),
            importItem.getQuantity(),
            importItem.getPrice(),
            importItem.getTotal(),
            basicProductDTO
        );
    }
}
