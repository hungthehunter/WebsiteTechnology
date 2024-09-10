package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.DecentralizationDTO;
import com.example.NVIDIA.model.Decentralization;

public interface DecentralizationService {
    Decentralization getById(Long id);
    List<Decentralization> getAll();
    DecentralizationDTO create(DecentralizationDTO DecentralizationDTO); 
    DecentralizationDTO update(Long id, DecentralizationDTO DecentralizationDTO);
    void delete(Long id);
}
