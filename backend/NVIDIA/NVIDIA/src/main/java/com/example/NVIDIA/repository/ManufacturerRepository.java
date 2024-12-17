package com.example.NVIDIA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.NVIDIA.model.Manufacturer;
import org.springframework.stereotype.Repository;

@Repository
public interface ManufacturerRepository extends JpaRepository<Manufacturer,Long>{
    // Truy vấn tất cả các manufacturer có status = true
    @Query("SELECT m FROM Manufacturer m WHERE m.status = true")
    List<Manufacturer> findAllByStatusTrue();

    // Truy vấn manufacturer theo ID chỉ khi status = true
    @Query("SELECT m FROM Manufacturer m WHERE m.id = :id AND m.status = true")
    Optional<Manufacturer> findByIdAndStatusTrue(@Param("id") Long id);
}
