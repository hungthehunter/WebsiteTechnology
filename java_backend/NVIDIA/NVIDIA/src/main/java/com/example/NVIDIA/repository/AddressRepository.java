package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.Address;

@Repository
@EnableJpaRepositories
public interface AddressRepository extends JpaRepository<Address ,Long>{

}
