package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.Decentralization;

@Repository
public interface DecentralizationRepository extends JpaRepository<Decentralization, Long>{
	 
}
