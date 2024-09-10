package com.example.NVIDIA.mapper;

import java.util.function.Function;

import com.example.NVIDIA.dto.PromotionDTO;
import com.example.NVIDIA.model.Promotion;
import org.springframework.stereotype.Component;
@Component
public class PromotionDTOMapper implements Function<Promotion,PromotionDTO>{

	@Override
	public PromotionDTO apply(Promotion promotion) {
	
		return new PromotionDTO(
				
				promotion.getPromotionName(),
				promotion.getDescription(),
				promotion.getDiscountPercentage(),
				promotion.getStartDate(),
				promotion.getEnd_date(),
				promotion.isStatus()
				);
	}

}
