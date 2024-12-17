package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.NVIDIA.model.Promotion;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion,Long> {

}
