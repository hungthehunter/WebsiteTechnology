package com.example.NVIDIA.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.BasicProductDTO;
import com.example.NVIDIA.dto.ExportDTO;
import com.example.NVIDIA.dto.ExportItemDTO;
import com.example.NVIDIA.dto.ImportItemDTO;
import com.example.NVIDIA.model.Export;
import com.example.NVIDIA.model.ExportItem;
import com.example.NVIDIA.model.ImportItem;
import com.example.NVIDIA.model.Product;

@Component
public class ExportItemDTOMapper implements Function<ExportItem, ExportItemDTO> {
    @Override
    public ExportItemDTO apply(ExportItem exportItem) {
        Product product = exportItem.getProduct();

        BasicProductDTO basicProductDTO = new BasicProductDTO();
        basicProductDTO.setId(product.getId());
        basicProductDTO.setProductName(product.getProductName());
        basicProductDTO.setProduct_image(product.getProduct_image());
        basicProductDTO.setStatus(product.isStatus());
        basicProductDTO.setUnitInStock(product.getUnitInStock());
        basicProductDTO.setUnitInOrder(product.getUnitInOrder());
        basicProductDTO.setUnitPrice(product.getUnitPrice());

        return new ExportItemDTO(
            exportItem.getId(),
            exportItem.getQuantity(),
            exportItem.getPrice(),
            exportItem.getTotal(),
            basicProductDTO
        );
    }
}
