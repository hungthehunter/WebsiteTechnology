package com.example.NVIDIA.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.NVIDIA.model.Access;

@Repository
public interface AccessRepository extends JpaRepository<Access, Long>{
    
	@Query("SELECT a FROM Access a WHERE a.status = true AND a.id NOT IN (1, 2)")
    List<Access> findAllByStatusTrue();

	@Query("SELECT a FROM Access a WHERE a.id = :id AND a.status = true AND a.id NOT IN (1, 2)")
    Optional<Access> findByIdAndStatusTrue(@Param("id") Long id);
}
