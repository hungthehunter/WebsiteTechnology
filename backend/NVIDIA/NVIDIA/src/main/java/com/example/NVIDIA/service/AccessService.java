package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.AccessDTO;
import com.example.NVIDIA.model.Access;

public interface AccessService {
    Access getById(Long id);
    List<Access> getAll();
    AccessDTO create(AccessDTO AccessDTO); 
    AccessDTO update(Long id, AccessDTO AccessDTO);
    void delete(Long id);
}
