package com.example.NVIDIA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.ProductDTO;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.service.ProductService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // POST: Tạo sản phẩm mới
    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestPart("product") Product productDTO,
            @RequestParam("mainImage") MultipartFile mainImage,
            @RequestParam("images") List<MultipartFile> images) throws IOException {

        Product createdProduct = productService.create(productDTO, images, mainImage);
        return ResponseEntity.ok(createdProduct);
    }

    // PUT: Cập nhật sản phẩm theo ID
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") Product productDTO,
            @RequestParam(value = "mainImage", required = false) MultipartFile mainImage,
            @RequestParam(value = "images", required = false) List<MultipartFile> images) throws IOException {

        Product updatedProduct = productService.update(id, productDTO, images, mainImage);
        return ResponseEntity.ok(updatedProduct);
    }

    // DELETE: Xóa sản phẩm theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) throws IOException {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // GET: Lấy danh sách tất cả sản phẩm
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> productList = productService.getAll();
        return ResponseEntity.ok(productList);
    }

    // GET: Lấy thông tin sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.getById(id);
        return ResponseEntity.ok(product);
    }
    
    @GetMapping("/manufacturer/{id}")
    public ResponseEntity<List<ProductDTO>> getAllProductByManufacturerId(@PathVariable Long id) {
        List<ProductDTO> products = productService.getAllByManufacturerId(id);
        return ResponseEntity.ok(products);
    }
}
