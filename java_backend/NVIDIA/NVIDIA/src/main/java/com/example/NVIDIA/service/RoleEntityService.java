package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.RoleEntityDTO;
import com.example.NVIDIA.model.RoleEntity;

public interface RoleEntityService {
    RoleEntity getById(Long id);
    List<RoleEntity> getAll();
    RoleEntityDTO create(RoleEntityDTO RoleEntityDTO); 
    RoleEntityDTO update(Long id, RoleEntityDTO RoleEntityDTO);
    void delete(Long id);
}
