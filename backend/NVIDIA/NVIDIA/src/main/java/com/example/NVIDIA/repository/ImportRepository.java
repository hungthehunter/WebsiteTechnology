package com.example.NVIDIA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.Import;

@Repository
public interface ImportRepository extends JpaRepository<Import, Long> {
    // @Query("Select * from product p where product.id = :product.id and status= true")
    // List<Import> findAllByProductId(Long productId);

    // @Query("SELECT p FROM IMPORT p WHERE p.STATUS = TRUE")
    List<Import> findAll();
}
