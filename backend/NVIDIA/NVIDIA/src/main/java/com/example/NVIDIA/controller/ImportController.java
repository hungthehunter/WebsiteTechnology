package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.example.NVIDIA.dto.ExportDTO;
import com.example.NVIDIA.dto.ImportDTO;
import com.example.NVIDIA.service.ImportService;

@RestController
@RequestMapping("/api/imports")
public class ImportController {
    @Autowired
    private ImportService importService;

    @GetMapping("/{id}")
    public ResponseEntity<ImportDTO> getImportById(@PathVariable Long id){
        ImportDTO importDTO = importService.getById(id);
        return ResponseEntity.ok(importDTO);
    }

    @GetMapping
    public ResponseEntity<List<ImportDTO>> getAllImport(){
        List<ImportDTO> result = importService.getAll();
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImportDTO> updateImport(
            @PathVariable Long id,
            @RequestPart(value = "import") ImportDTO body){
        ImportDTO result = importService.update(id, body);
        
        if (result == null) return ResponseEntity.badRequest().body(new ImportDTO());
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<ImportDTO> createImport(@RequestPart(value = "import") ImportDTO body){
        ImportDTO importDTO = importService.create(body);

        if (importDTO == null) return ResponseEntity.badRequest().body(new ImportDTO());
        return ResponseEntity.ok(importDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImport(@PathVariable Long id){
        return ResponseEntity.badRequest().body("Delete not available");
    }
}
