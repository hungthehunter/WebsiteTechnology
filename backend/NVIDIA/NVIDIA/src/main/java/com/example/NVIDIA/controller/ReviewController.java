package com.example.NVIDIA.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.ReviewDTO;
import com.example.NVIDIA.model.Review;
import com.example.NVIDIA.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService ReviewService;

    // POST: Tạo sản phẩm mới
    @PostMapping
    public ResponseEntity<Review> createReview(
            @RequestPart(value = "Review") ReviewDTO ReviewDTO) {

        Review createdReview = ReviewService.create(ReviewDTO);
        return ResponseEntity.ok(createdReview);
    }

    // PUT: Cập nhật sản phẩ theo ID
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(
            @PathVariable Long id,
            @RequestPart("Review") ReviewDTO ReviewDTO) {

        Review updatedReview = ReviewService.update(id, ReviewDTO);
        return ResponseEntity.ok(updatedReview);
    }

    // DELETE: Xóa sản phẩm theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) throws IOException {
        ReviewService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // GET: Lấy danh sách tất cả sản phẩm
    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        List<ReviewDTO> ReviewList = ReviewService.getAll();
        return ResponseEntity.ok(ReviewList);
    }

    // GET: Lấy thông tin sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        ReviewDTO Review = ReviewService.getById(id);
        return ResponseEntity.ok(Review);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<List<ReviewDTO>> getAllReviewsByProductId(@PathVariable Long id) {
        var response = ReviewService.getAllByProductId(id);
        return ResponseEntity.ok(response);
    }
}
