package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.NVIDIA.dto.ManufacturerDTO;
import com.example.NVIDIA.model.Manufacturer;
import com.example.NVIDIA.service.ManufacturerService;

@RestController
@RequestMapping("/api/manufacturers")
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;

    @GetMapping("/{id}")
    public ResponseEntity<Manufacturer> getManufacturerById(@PathVariable Long id) {
        Manufacturer manufacturerDTO = manufacturerService.getById(id);
        return ResponseEntity.ok(manufacturerDTO);
    }

    @GetMapping
    public ResponseEntity<List<Manufacturer>> getAllManufacturers() {
        List<Manufacturer> manufacturers = manufacturerService.getAll();
        return ResponseEntity.ok(manufacturers);
    }

    @PostMapping
    public ResponseEntity<ManufacturerDTO> createManufacturer(@RequestBody ManufacturerDTO manufacturerDTO) {
        ManufacturerDTO createdManufacturer = manufacturerService.create(manufacturerDTO);
        return ResponseEntity.ok(createdManufacturer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ManufacturerDTO> updateManufacturer(@PathVariable Long id, @RequestBody ManufacturerDTO manufacturerDTO) {
        ManufacturerDTO updatedManufacturer = manufacturerService.update(id, manufacturerDTO);
        return ResponseEntity.ok(updatedManufacturer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManufacturer(@PathVariable Long id) {
        manufacturerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
