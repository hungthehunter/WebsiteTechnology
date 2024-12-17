package com.example.NVIDIA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import com.example.NVIDIA.model.Category;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface CategoryRepository extends JpaRepository<Category,Long>{
    @Query("SELECT c FROM Category c WHERE c.status = true")
    List<Category> findAllByStatusTrue();

    // Truy vấn category theo ID chỉ khi status = true
    @Query("SELECT c FROM Category c WHERE c.id = :id AND c.status = true")
    Optional<Category> findByIdAndStatusTrue(@Param("id") Long id);
}
