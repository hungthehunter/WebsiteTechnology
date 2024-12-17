package com.example.NVIDIA.service;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.ProductDTO;
import com.example.NVIDIA.model.Product;

public interface ProductService {
    ProductDTO getById(Long id);
    List<ProductDTO> getAll();
    List<ProductDTO> getAllByManufacturerId(Long id);
    Product create(Product productDTO,List<MultipartFile> listOfFile ,MultipartFile file ) throws IOException;
    Product update(Long id, Product productDTO,List<MultipartFile> listOfFile, MultipartFile file) throws IOException;
    void delete(Long id) throws IOException;
}
