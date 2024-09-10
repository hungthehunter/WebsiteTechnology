package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.NVIDIA.dto.ProductImageDTO;
import com.example.NVIDIA.model.ProductImage;
import com.example.NVIDIA.service.ProductImageService;

@RestController
@RequestMapping("/api/ProductImageImages")
public class ProductImageController {

	@Autowired
	private ProductImageService productImageService;
	
	 @GetMapping("/{id}")
	    public ResponseEntity<ProductImageDTO> getProductImageById(@PathVariable Long id) {
	        ProductImageDTO ProductImageDTO = productImageService.getById(id);
	        return ResponseEntity.ok(ProductImageDTO);
	    }

	    @GetMapping
	    public ResponseEntity<List<ProductImage>> getAllProductImages() {
	        List<ProductImage> ProductImages = productImageService.getAll();
	        return ResponseEntity.ok(ProductImages);
	    }

	    @PostMapping
	    public ResponseEntity<ProductImageDTO> createProductImage(@RequestBody ProductImageDTO ProductImageDTO) {
	        ProductImageDTO createdProductImage = productImageService.create(ProductImageDTO);
	        return ResponseEntity.ok(createdProductImage);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<ProductImageDTO> updateProductImage(@PathVariable Long id, @RequestBody ProductImageDTO ProductImageDTO) {
	        ProductImageDTO updatedProductImage = productImageService.update(id, ProductImageDTO);
	        return ResponseEntity.ok(updatedProductImage);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteProductImage(@PathVariable Long id) {
	        productImageService.delete(id);
	        return ResponseEntity.noContent().build();
	    }
}