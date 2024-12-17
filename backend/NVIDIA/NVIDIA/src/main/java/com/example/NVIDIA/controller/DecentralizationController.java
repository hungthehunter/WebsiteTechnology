package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.NVIDIA.dto.DecentralizationDTO;
import com.example.NVIDIA.model.Decentralization;
import com.example.NVIDIA.service.DecentralizationService;

@RestController
@RequestMapping("/api/decentralizations")
public class DecentralizationController {

    @Autowired
    private DecentralizationService DecentralizationService;

    @GetMapping("/{id}")
    public ResponseEntity<Decentralization> getDecentralizationById(@PathVariable Long id) {
        Decentralization DecentralizationDTO = DecentralizationService.getById(id);
        return ResponseEntity.ok(DecentralizationDTO);
    }

    @GetMapping
    public ResponseEntity<List<Decentralization>> getAllCategories() {
        List<Decentralization> categories = DecentralizationService.getAll();
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<DecentralizationDTO> createDecentralization(@RequestBody DecentralizationDTO DecentralizationDTO) {
        DecentralizationDTO createdDecentralization = DecentralizationService.create(DecentralizationDTO);
        return ResponseEntity.ok(createdDecentralization);
    }


    @PutMapping("/{id}")
    public ResponseEntity<DecentralizationDTO> updateDecentralization(@PathVariable Long id, @RequestBody DecentralizationDTO DecentralizationDTO) {
        DecentralizationDTO updatedDecentralization = DecentralizationService.update(id, DecentralizationDTO);
        return ResponseEntity.ok(updatedDecentralization);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDecentralization(@PathVariable Long id) {
        DecentralizationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
