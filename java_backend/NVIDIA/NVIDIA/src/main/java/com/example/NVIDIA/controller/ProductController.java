package com.example.NVIDIA.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.ProductDTO;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // API để lấy sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product productDTO = productService.getById(id);
        return ResponseEntity.ok(productDTO);
    }

    // API để lấy tất cả sản phẩm
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    // API để tạo sản phẩm mới
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(
        @RequestPart("product") ProductDTO productDTO, 
        @RequestParam("images") List<MultipartFile> files, 
        @RequestParam("image") MultipartFile mainFile) throws IOException {
        
        ProductDTO createdProduct = productService.create(productDTO, files, mainFile);
        return ResponseEntity.ok(createdProduct);
    }

    // API để cập nhật sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id, 
            @RequestParam("product") String productJson, 
            @RequestParam("images") List<MultipartFile> files,
            @RequestParam("image") MultipartFile mainFile) throws IOException {
        
        // Chuyển đổi JSON string thành ProductDTO
        ObjectMapper objectMapper = new ObjectMapper();
        ProductDTO productDTO = objectMapper.readValue(productJson, ProductDTO.class);
        
        ProductDTO updatedProduct = productService.update(id, productDTO, files, mainFile);
        return ResponseEntity.ok(updatedProduct);
    }

    // API để xóa sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
