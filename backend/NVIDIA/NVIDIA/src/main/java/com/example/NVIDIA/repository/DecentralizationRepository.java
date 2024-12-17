package com.example.NVIDIA.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.NVIDIA.model.Decentralization;

@Repository
@EnableJpaRepositories
public interface DecentralizationRepository extends JpaRepository<Decentralization, Long>{
	
	@Query("SELECT d FROM Decentralization d WHERE d.access.status = true AND d.id = :id")
    Optional<Decentralization> findByIdWithStatus(@Param("id") Long id);

    @Query("SELECT d FROM Decentralization d WHERE d.access.status = true")
    List<Decentralization> findAllWithStatus();

}
