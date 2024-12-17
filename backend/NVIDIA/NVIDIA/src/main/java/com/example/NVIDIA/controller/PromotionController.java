package com.example.NVIDIA.controller;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.PromotionDTO;
import com.example.NVIDIA.model.Promotion;
import com.example.NVIDIA.service.PromotionService;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @GetMapping("/{id}")
    public ResponseEntity<PromotionDTO> getPromotionById(@PathVariable Long id) {
        PromotionDTO promotion = promotionService.getById(id);
        return ResponseEntity.ok(promotion);
    }

    @GetMapping
    public ResponseEntity<List<PromotionDTO>> getAllPromotions() {
        List<PromotionDTO> promotions = promotionService.getAll();
        return ResponseEntity.ok(promotions);
    }

    @PostMapping
    public ResponseEntity<Promotion> createPromotion(
    		@RequestPart("promotion") Promotion promotionDTO,
    		@RequestParam(value="file", required = false) MultipartFile file
    		) throws IOException {
        Promotion createdPromotion = promotionService.create(promotionDTO,file);
        return ResponseEntity.ok(createdPromotion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Promotion> updatePromotion(
            @PathVariable Long id,
            @RequestParam(value="file", required = false) MultipartFile file,
            @RequestPart("promotion") Promotion promotionDTO) throws IOException{
        Promotion updatedPromotion = promotionService.update(id, promotionDTO,file);
        return ResponseEntity.ok(updatedPromotion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        promotionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
