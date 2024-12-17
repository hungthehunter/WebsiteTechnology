package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.DecentralizationDTO;
import com.example.NVIDIA.model.Decentralization;

public interface DecentralizationService {
    Decentralization getById(Long id);
    List<Decentralization> getAll();
    DecentralizationDTO create(DecentralizationDTO Decentralization); 
    DecentralizationDTO update(Long id, DecentralizationDTO Decentralization);
    void delete(Long id);
}
