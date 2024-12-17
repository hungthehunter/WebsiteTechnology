package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.ExportDTO;

public interface ExportService {
    ExportDTO getById(Long id);
    List<ExportDTO> getAll();

    // List<ExportDTO> getByProductId(Long productId);

    ExportDTO create(ExportDTO exportDTO);
    ExportDTO update(Long id, ExportDTO exportDTO);
}
