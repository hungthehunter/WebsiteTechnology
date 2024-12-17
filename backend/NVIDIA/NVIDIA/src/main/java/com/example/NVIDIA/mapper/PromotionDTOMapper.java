package com.example.NVIDIA.mapper;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.example.NVIDIA.dto.PromotionDTO;
import com.example.NVIDIA.model.Promotion;

@Component
public class PromotionDTOMapper implements Function<Promotion, PromotionDTO> {
	
	@Autowired
	private ProductDTOMapper productDTOMapper;
	
	@Autowired
	private CategoryDTOMapper categoryDTOMapper;
	
    @Override
    public PromotionDTO apply(Promotion promotion) {
        return new PromotionDTO(
            promotion.getId(),
            promotion.getName(),
            promotion.getDescription(),
            promotion.getDiscountPercentage(),
            promotion.getStartDate(),
            promotion.getEndDate(),
            promotion.isActive(),
            promotion.getCreatedAt(),
            promotion.getUpdatedAt(),
            promotion.getApplicableProducts().stream().map(productDTOMapper).collect(Collectors.toList()),
            promotion.getApplicableCategories().stream().map(categoryDTOMapper).collect(Collectors.toList()),
        	promotion.getImageCloud()
        		);
        
        	}
}
