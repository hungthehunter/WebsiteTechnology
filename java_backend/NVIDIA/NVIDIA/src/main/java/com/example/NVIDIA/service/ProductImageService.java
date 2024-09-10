package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.ProductImageDTO;
import com.example.NVIDIA.model.ProductImage;

public interface ProductImageService {
	ProductImageDTO getById(Long id);
	List<ProductImage> getAll();
	ProductImageDTO create(ProductImageDTO productImageDTO);
	ProductImageDTO update(Long id,ProductImageDTO productImageDTO);
	void delete(Long id);
}