package com.example.NVIDIA.repository;

import com.example.NVIDIA.model.MainImage;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MainImageRepository extends JpaRepository<MainImage, Long> {
	 Optional<MainImage> findByProductId(Long productId);
}
