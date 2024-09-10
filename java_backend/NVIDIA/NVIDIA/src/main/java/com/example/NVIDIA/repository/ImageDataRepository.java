package com.example.NVIDIA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.NVIDIA.model.ImageData;

public interface ImageDataRepository extends JpaRepository<ImageData,Long>{

	Optional<ImageData> findByName(String fileName);
	List<ImageData> findByProductId(Long productId);
}
