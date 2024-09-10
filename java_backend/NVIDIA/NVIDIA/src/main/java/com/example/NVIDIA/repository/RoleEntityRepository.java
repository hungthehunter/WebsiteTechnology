package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.RoleEntity;

@Repository
public interface RoleEntityRepository extends JpaRepository<RoleEntity, Long>{

}
