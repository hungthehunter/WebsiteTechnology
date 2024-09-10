package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.NVIDIA.dto.PromotionDTO;
import com.example.NVIDIA.model.Promotion;
import com.example.NVIDIA.service.PromotionService;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @GetMapping("/{id}")
    public ResponseEntity<Promotion> getPromotionById(@PathVariable Long id) {
        Promotion promotionDTO = promotionService.getById(id);
        return ResponseEntity.ok(promotionDTO);
    }

    @GetMapping
    public ResponseEntity<List<Promotion>> getAllPromotions() {
        List<Promotion> promotions = promotionService.getAll();
        return ResponseEntity.ok(promotions);
    }

    @PostMapping
    public ResponseEntity<PromotionDTO> createPromotion(@RequestBody PromotionDTO promotionDTO) {
        PromotionDTO createdPromotion = promotionService.create(promotionDTO);
        return ResponseEntity.ok(createdPromotion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromotionDTO> updatePromotion(@PathVariable Long id, @RequestBody PromotionDTO promotionDTO) {
        PromotionDTO updatedPromotion = promotionService.update(id, promotionDTO);
        return ResponseEntity.ok(updatedPromotion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        promotionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
