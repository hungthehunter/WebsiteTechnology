package com.example.NVIDIA.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.NVIDIA.model.Product;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
	
    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.id = :id")
    void customDeleteById(@Param("id") Long id);

    
    @Query("SELECT p FROM Product p WHERE p.status = true")
    List<Product> findAllByStatusTrue();

    @Query("SELECT p FROM Product p WHERE p.id = :id AND p.status = true")
    Optional<Product> findByIdAndStatusTrue(@Param("id") Long id);
    
    @Query("SELECT p FROM Product p WHERE p.manufacturer.id = :id AND p.status = true")
    List<Product> findAllByManufacturerId(@Param("id") Long id);
}
