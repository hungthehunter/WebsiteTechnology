package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.NVIDIA.model.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

}
