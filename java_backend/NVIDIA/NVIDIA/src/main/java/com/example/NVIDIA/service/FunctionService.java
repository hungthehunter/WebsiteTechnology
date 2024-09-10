package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.FunctionDTO;
import com.example.NVIDIA.model.Function;

public interface FunctionService {
    Function getById(Long id);
    List<Function> getAll();
    FunctionDTO create(FunctionDTO FunctionDTO); 
    FunctionDTO update(Long id, FunctionDTO FunctionDTO);
    void delete(Long id);
}
