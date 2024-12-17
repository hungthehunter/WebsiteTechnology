package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.FunctionDTO;

public interface FunctionService {
    FunctionDTO getById(Long id);
    List<FunctionDTO> getAll();
    FunctionDTO create(FunctionDTO FunctionDTO); 
    FunctionDTO update(Long id, FunctionDTO FunctionDTO);
    void delete(Long id);
}
