package com.example.NVIDIA.service.impl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.PromotionDTO;
import com.example.NVIDIA.mapper.PromotionDTOMapper;
import com.example.NVIDIA.model.Promotion;
import com.example.NVIDIA.repository.PromotionRepository;
import com.example.NVIDIA.service.PromotionService;

@Service
public class PromotionServiceImpl implements PromotionService {

	@Autowired
	private PromotionRepository promotionRepository;
	
	@Autowired
	private PromotionDTOMapper promotionDTOMapper;

	@Override
	public Promotion getById(Long id) {
		return promotionRepository.findById(id).orElseThrow(()-> new RuntimeException("Cannot find Promotion by id"));
	
	}

	@Override
	public List<Promotion> getAll() {
		return promotionRepository.findAll();
	}

	@Override
	public PromotionDTO create(PromotionDTO promotionDTO) {
		Promotion promotion=new Promotion();
		promotion.setDescription(promotionDTO.getDescription());
		promotion.setDiscountPercentage(promotionDTO.getDiscountPercentage());
		promotion.setEnd_date(promotionDTO.getEnd_date());
		promotion.setPromotionName(promotionDTO.getPromotionName());
		promotion.setStartDate(promotionDTO.getStartDate());
		promotion.setStatus(true);
	
		Promotion savePromotion=promotionRepository.save(promotion);
		return promotionDTOMapper.apply(savePromotion);
	}

	@Override
	public PromotionDTO update(Long id, PromotionDTO promotionDTO) {
		Promotion promotion=promotionRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found promotion"));
		promotion.setDescription(promotionDTO.getDescription());
		promotion.setDiscountPercentage(promotionDTO.getDiscountPercentage());
		promotion.setEnd_date(promotionDTO.getEnd_date());
		promotion.setPromotionName(promotionDTO.getPromotionName());
		promotion.setStartDate(promotionDTO.getStartDate());
		promotion.setStatus(true);
		
		return promotionDTOMapper.apply(promotion);
	}

	@Override
	public void delete(Long id) {
		promotionRepository.deleteById(id);
	}

}
