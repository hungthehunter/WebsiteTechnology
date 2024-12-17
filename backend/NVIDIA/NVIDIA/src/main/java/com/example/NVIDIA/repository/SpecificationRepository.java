package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.Specification;

import jakarta.transaction.Transactional;

@Repository
public interface SpecificationRepository extends JpaRepository<Specification, Long>{
	@Modifying
	@Transactional
	@Query("DELETE FROM Specification s WHERE s.product.id = :productId")
    void deleteAllByProductId(@Param("productId") Long productId);
}
