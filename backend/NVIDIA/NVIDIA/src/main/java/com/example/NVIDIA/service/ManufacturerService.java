package com.example.NVIDIA.service;
import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.ManufacturerDTO;

import com.example.NVIDIA.model.Manufacturer;

public interface ManufacturerService {
    ManufacturerDTO getById(Long id);
    List< ManufacturerDTO> getAll();
    Manufacturer create(  Manufacturer   manufacturerDTO, MultipartFile file) throws IOException;
    Manufacturer update(Long id,   Manufacturer categoryDTO, MultipartFile file) throws IOException;
    void delete(Long id);
}

