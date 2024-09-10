package com.example.NVIDIA.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.ProductDTO;
import com.example.NVIDIA.model.Product;

public interface ProductService {
    Product getById(Long id);
    List<Product> getAll();
    ProductDTO create(ProductDTO productDTO,List<MultipartFile> listOfFile ,MultipartFile file ) throws IOException;
    ProductDTO update(Long id, ProductDTO productDTO,List<MultipartFile> listOfFile, MultipartFile file) throws IOException;
    void delete(Long id);
    void setMainImage(Product product);
}
