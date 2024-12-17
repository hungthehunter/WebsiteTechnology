package com.example.NVIDIA.mapper;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.BasicCategoryDTO;
import com.example.NVIDIA.dto.BasicManufacturerDTO;
import com.example.NVIDIA.dto.BasicPromotionDTO;
import com.example.NVIDIA.dto.CategoryDTO;
import com.example.NVIDIA.dto.ManufacturerDTO;
import com.example.NVIDIA.dto.ProductDTO;
import com.example.NVIDIA.dto.PromotionDTO;
import com.example.NVIDIA.model.Product;

@Component
public class ProductDTOMapper implements Function<Product,ProductDTO>{
	
	@Override
	public ProductDTO apply(Product product) {

	    BasicManufacturerDTO manufacturerDTO = null;
	    if (product.getManufacturer() != null) {
	        manufacturerDTO = new BasicManufacturerDTO(
	            product.getManufacturer().getId(), 
	            product.getManufacturer().getName(),
	            product.getManufacturer().getCountry(),
	            product.getManufacturer().getWebsite(),
	            product.getManufacturer().getDescription(),
	            product.getManufacturer().getEmail(),
	            product.getManufacturer().getPhone(),
	            product.getManufacturer().getAddress(),
	            product.getManufacturer().getCreatedAt(),
	            product.getManufacturer().getUpdatedAt(),
	            product.getManufacturer().getImageCloud()
	           
	        );
	    }

	    BasicCategoryDTO categoryDTO = null;
	    if (product.getCategory() != null) {
	        categoryDTO = new BasicCategoryDTO(
	            product.getCategory().getId(),
	            product.getCategory().getName(),
	            product.getCategory().getDescription(),
//	            product.getCategory().getPromotion(),
	            product.getCategory().getImageCloud()

	        );
	    }
	    
	    BasicPromotionDTO promotionDTO = null;
	    if(product.getPromotion() != null) {
	    	promotionDTO = new BasicPromotionDTO(
	    			product.getPromotion().getId(),
	    			product.getPromotion().getName(),
	    			product.getPromotion().getDescription(),
	    			product.getPromotion().getDiscountPercentage(),
	    			product.getPromotion().getStartDate(),
	    			product.getPromotion().getEndDate(),
	    			product.getPromotion().isActive(),
	    			product.getPromotion().getCreatedAt(),
	    			product.getPromotion().getUpdatedAt()
	    			);
	    }
	    
		return new ProductDTO(
				product.getId(),
				product.getUnitPrice(),
				product.getUnitInStock(),
				product.getUnitInOrder(),
				product.getProductName(),
				product.isStatus(),
				product.getProduct_image().stream().collect(Collectors.toList()),
				product.getSpecification().stream().collect(Collectors.toList()),
				promotionDTO,
		        manufacturerDTO, 
		        categoryDTO
				);
	}

}
