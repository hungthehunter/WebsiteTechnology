package com.example.NVIDIA.mapper;

import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.BasicProductDTO;
import com.example.NVIDIA.dto.BasicPromotionDTO;
import com.example.NVIDIA.dto.CategoryDTO;
import com.example.NVIDIA.dto.PromotionDTO;
import com.example.NVIDIA.model.Category;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.model.Promotion;

@Component
public class CategoryDTOMapper implements Function<Category, CategoryDTO> {

	

	
	
    @Override
    public CategoryDTO apply(Category category) {
    	
        BasicPromotionDTO promotionDTO = null;
        if(category.getPromotion() != null) {
        	promotionDTO = new BasicPromotionDTO(
        			category.getPromotion().getId(),
        			category.getPromotion().getName(),
        			category.getPromotion().getDescription(),
        			category.getPromotion().getDiscountPercentage(),
        			category.getPromotion().getStartDate(),
        			category.getPromotion().getEndDate(),
        			category.getPromotion().isActive(),
        			category.getPromotion().getCreatedAt(),
        			category.getPromotion().getUpdatedAt()
        			);
        }
    	
        return new CategoryDTO(
            category.getId(),
            category.getName(),
            category.getDescription(),
            category.isStatus(),
            promotionDTO,
            category.getImageCloud(),
            category.getProducts().stream()
                .map(product -> mapToBasicProductDTO(product))
                .collect(Collectors.toList())
        );
    }

    private BasicProductDTO mapToBasicProductDTO(Product product) {
        return new BasicProductDTO(
            product.getId(),
            product.getUnitPrice(),
            product.getUnitInStock(),
            product.getUnitInOrder(),
            product.getProductName(),
            product.isStatus(),
            product.getProduct_image().stream().collect(Collectors.toList())
//            product.getSpecification().stream().collect(Collectors.toList())
        );
    }
    
}
