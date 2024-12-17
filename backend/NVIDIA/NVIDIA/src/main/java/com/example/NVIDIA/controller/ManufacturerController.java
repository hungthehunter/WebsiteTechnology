package com.example.NVIDIA.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.ManufacturerDTO;
import com.example.NVIDIA.model.Manufacturer;
import com.example.NVIDIA.service.ManufacturerService;

@RestController
@RequestMapping("/api/manufacturers")
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;

    @GetMapping("/{id}")
    public ResponseEntity<ManufacturerDTO> getManufacturerById(@PathVariable Long id) {
        ManufacturerDTO manufacturer = manufacturerService.getById(id);
        return ResponseEntity.ok(manufacturer);
    }

    @GetMapping
    public ResponseEntity<List<ManufacturerDTO>> getAllManufacturers() {
        List<ManufacturerDTO> manufacturers = manufacturerService.getAll();
        return ResponseEntity.ok(manufacturers);
    }

    @PostMapping
    public ResponseEntity<Manufacturer> createManufacturer(
    		@RequestPart("manufacturer") Manufacturer manufacturerDTO,
    		@RequestParam(value="file", required = false) MultipartFile file
    		) throws IOException {
        Manufacturer createdManufacturer = manufacturerService.create(manufacturerDTO,file);
        return ResponseEntity.ok(createdManufacturer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manufacturer> updateManufacturer(
            @PathVariable Long id,
            @RequestPart("manufacturer") Manufacturer manufacturerDTO,
            @RequestParam(value="file", required = false) MultipartFile file
    ) throws IOException {
        Manufacturer updatedManufacturer = manufacturerService.update(id, manufacturerDTO,file);
        return ResponseEntity.ok(updatedManufacturer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManufacturer(@PathVariable Long id) {
        manufacturerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
