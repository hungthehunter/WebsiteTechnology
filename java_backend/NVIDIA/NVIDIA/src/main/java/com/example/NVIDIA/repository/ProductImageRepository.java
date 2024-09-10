package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.ProductImage;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage,Long>{

}
