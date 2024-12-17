package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.ReviewDTO;
import com.example.NVIDIA.model.Review;

public interface ReviewService {
	ReviewDTO getById(Long id);

	List<ReviewDTO> getAll();

	List<ReviewDTO> getAllByProductId(Long id);

	Review create(ReviewDTO reviewDTO);

	Review update(Long id, ReviewDTO reviewDTO);

	void delete(Long id);
}
