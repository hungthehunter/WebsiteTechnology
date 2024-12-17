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
import com.example.NVIDIA.service.ExportService;

@RestController
@RequestMapping("/api/exports")
public class ExportController {
    @Autowired
    private ExportService exportService;

    @GetMapping("/{id}")
    public ResponseEntity<ExportDTO> getExportById(@PathVariable Long id){
        ExportDTO exportDTO = exportService.getById(id);
        return ResponseEntity.ok(exportDTO);
    }

    @GetMapping
    public ResponseEntity<List<ExportDTO>> getAllExport(){
        List<ExportDTO> result = exportService.getAll();
        return ResponseEntity.ok(result);
    }

    // @GetMapping("/product/{id}")
    // public ResponseEntity<List<ExportDTO>> getAllByProductId(@PathVariable Long id){
    //     List<ExportDTO> result = exportService.getByProductId(id);
    //     return ResponseEntity.ok(result);
    // }

    @PostMapping
    public ResponseEntity<ExportDTO> createExport(@RequestPart(value = "export") ExportDTO body){
        ExportDTO exportDTO = exportService.create(body);

        if (exportDTO == null) return ResponseEntity.badRequest().body(new ExportDTO());
        return ResponseEntity.ok(exportDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExportDTO> updateExport(
            @PathVariable Long id,
            @RequestPart(value = "export") ExportDTO body){
        ExportDTO result = exportService.update(id, body);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExport(@PathVariable Long id){
        return ResponseEntity.badRequest().body("Delete not available");
    }
}
