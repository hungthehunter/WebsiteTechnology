package com.example.NVIDIA.service.impl;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.ReviewDTO;
import com.example.NVIDIA.mapper.ReviewDTOMapper;
import com.example.NVIDIA.model.Review;
import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.repository.ReviewRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService{

	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ReviewDTOMapper reviewDTOMapper;
	
	@Override
	public ReviewDTO getById(Long id) {
		Review review=reviewRepository.findById(id).orElseThrow(()-> new RuntimeException("Cannot find review"));
		return reviewDTOMapper.apply(review);
	}

	@Override
	public List<ReviewDTO> getAll() {
         List<Review> review=reviewRepository.findAll();
		return review.stream().map(reviewDTOMapper).collect(Collectors.toList());
	}

	@Override
	public List<ReviewDTO> getAllByProductId(Long id){
		var result = reviewRepository.findAllByProductId(id);
		return result.stream().map(reviewDTOMapper).collect(Collectors.toList());
	}

	@Override
	public Review create(ReviewDTO reviewDTO) {
		Review review=new Review();
		review.setComment(reviewDTO.getComment());
		review.setRating(reviewDTO.getRating());
		review.setReviewDate(reviewDTO.getReviewDate());
		if (reviewDTO.getProduct() != null && reviewDTO.getProduct().getId() != null) {
	        review.setProduct(productRepository.findById(reviewDTO.getProduct().getId())
	                .orElseThrow(() -> new RuntimeException("Failed to find product with id: " + reviewDTO.getProduct().getId())));
	    }
		
		if (reviewDTO.getUser() != null && reviewDTO.getUser().getId() != null) {
	        review.setUser(userRepository.findById(reviewDTO.getUser().getId())
	                .orElseThrow(() -> new RuntimeException("Failed to find user with id: " + reviewDTO.getUser().getId())));
	    }

		review = reviewRepository.save(review);
		return review;
	}

	@Override
	public Review update(Long id, ReviewDTO reviewDTO) {
		Review review=reviewRepository.findById(id).orElseThrow(()-> new RuntimeException("Cannot find review"));
		review.setComment(reviewDTO.getComment());
		review.setRating(reviewDTO.getRating());
		review.setReviewDate(reviewDTO.getReviewDate());
		if (reviewDTO.getProduct() != null && reviewDTO.getProduct().getId() != null) {
	        review.setProduct(productRepository.findById(reviewDTO.getProduct().getId())
	                .orElseThrow(() -> new RuntimeException("Failed to find product with id: " + reviewDTO.getProduct().getId())));
	    }
		
		if (reviewDTO.getUser() != null && reviewDTO.getUser().getId() != null) {
	        review.setUser(userRepository.findById(reviewDTO.getUser().getId())
	                .orElseThrow(() -> new RuntimeException("Failed to find user with id: " + reviewDTO.getUser().getId())));
	    }

		review = reviewRepository.save(review);
		return review;
	}

	@Override
	public void delete(Long id) {
	    Optional<Review> optionalReview = reviewRepository.findById(id);
	    if (!optionalReview.isPresent()) {
	        throw new RuntimeException("Review not found with id: " + id);
	    }
	    reviewRepository.deleteById(id);
	}

}
