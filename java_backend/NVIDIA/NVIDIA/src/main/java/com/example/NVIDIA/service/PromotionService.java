package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.PromotionDTO;
import com.example.NVIDIA.model.Promotion;

public interface PromotionService {
    Promotion getById(Long id);
    List<Promotion> getAll();
    PromotionDTO create(PromotionDTO promotionDTO);
    PromotionDTO update(Long id, PromotionDTO promotionDTO);
    void delete(Long id);
}
