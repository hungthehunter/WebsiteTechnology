package com.example.NVIDIA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.Address;

@Repository
@EnableJpaRepositories
public interface AddressRepository extends JpaRepository<Address ,Long>{

    @Query("SELECT a FROM Address a WHERE a.status = true")
    List<Address> findAllByStatusTrue();

    @Query("SELECT a FROM Address a WHERE a.id = :id AND a.status = true")
    Optional<Address> findByIdAndStatusTrue(Long id);
}
