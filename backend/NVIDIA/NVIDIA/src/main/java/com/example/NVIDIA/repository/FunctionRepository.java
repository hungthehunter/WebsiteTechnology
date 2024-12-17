package com.example.NVIDIA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.Function;

@Repository
public interface FunctionRepository extends JpaRepository<Function, Long> {
    
    @Query(value = "SELECT * FROM function_role f WHERE f.status = true AND f.function_name = :functionName", nativeQuery = true)
    Optional<Function> findByFunctionName(@Param("functionName") String functionName);

    // Truy vấn tất cả Function có status = true
    @Query(value = "SELECT * FROM function_role f WHERE f.status = true", nativeQuery = true)
    List<Function> findAllByStatusTrue();

    // Truy vấn Function theo ID chỉ khi status = true
    @Query(value = "SELECT * FROM function_role f WHERE f.id = :id AND f.status = true", nativeQuery = true)
    Optional<Function> findByIdAndStatusTrue(@Param("id") Long id);
}
