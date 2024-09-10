package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.NVIDIA.model.Manufacturer;
import org.springframework.stereotype.Repository;

@Repository
public interface ManufacturerRepository extends JpaRepository<Manufacturer,Long>{

}
