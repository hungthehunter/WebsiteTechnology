package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.ImportDTO;

public interface ImportService {
    ImportDTO getById(Long id);

    List<ImportDTO> getAll();

    ImportDTO create(ImportDTO importDTO);

    ImportDTO update(Long id, ImportDTO importDTO);
}
