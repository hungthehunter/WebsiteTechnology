package com.example.NVIDIA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.Export;

@Repository
public interface ExportRepository extends JpaRepository<Export, Long>{
    // List<Export> findAllByProductId(Long productId);
}
