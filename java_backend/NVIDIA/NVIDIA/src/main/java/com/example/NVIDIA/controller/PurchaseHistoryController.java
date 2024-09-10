package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.NVIDIA.dto.PurchaseHistoryDTO;
import com.example.NVIDIA.model.PurchaseHistory;
import com.example.NVIDIA.service.PurchaseHistoryService;

@RestController
@RequestMapping("/api/purchaseHistories")
public class PurchaseHistoryController {

    @Autowired
    private PurchaseHistoryService purchaseHistoryService;

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseHistory> getPurchaseHistoryById(@PathVariable Long id) {
        PurchaseHistory purchaseHistoryDTO = purchaseHistoryService.getById(id);
        return ResponseEntity.ok(purchaseHistoryDTO);
    }

    @GetMapping
    public ResponseEntity<List<PurchaseHistory>> getAllPurchaseHistories() {
        List<PurchaseHistory> purchaseHistories = purchaseHistoryService.getALL();
        return ResponseEntity.ok(purchaseHistories);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PurchaseHistory>> getCartsByUserId(@PathVariable Long userId) {
        List<PurchaseHistory> purchaseHistories = purchaseHistoryService.findPurchaseHistoriesByUserId(userId);
        return ResponseEntity.ok(purchaseHistories);
    }

    @PostMapping
    public ResponseEntity<PurchaseHistoryDTO> createPurchaseHistory(@RequestBody PurchaseHistoryDTO purchaseHistoryDTO) {
        PurchaseHistoryDTO createdPurchaseHistory = purchaseHistoryService.create(purchaseHistoryDTO);
        return ResponseEntity.ok(createdPurchaseHistory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchaseHistoryDTO> updatePurchaseHistory(@PathVariable Long id, @RequestBody PurchaseHistoryDTO purchaseHistoryDTO) {
        PurchaseHistoryDTO updatedPurchaseHistory = purchaseHistoryService.update(id, purchaseHistoryDTO);
        return ResponseEntity.ok(updatedPurchaseHistory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchaseHistory(@PathVariable Long id) {
        purchaseHistoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
