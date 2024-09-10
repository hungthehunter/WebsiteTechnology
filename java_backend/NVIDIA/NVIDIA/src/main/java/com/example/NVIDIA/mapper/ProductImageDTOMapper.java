package com.example.NVIDIA.mapper;

import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.ProductImageDTO;

import com.example.NVIDIA.model.ProductImage;

@Component
public class ProductImageDTOMapper implements Function<ProductImage,ProductImageDTO>{

	@Override
	public ProductImageDTO apply(ProductImage productImage) {
		return new ProductImageDTO(
				productImage.getMainPicture(),
				productImage.getListProductPicture().stream().collect(Collectors.toList())
				
				);
	}


}