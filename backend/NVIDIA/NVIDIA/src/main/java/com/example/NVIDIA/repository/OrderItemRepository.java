package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.NVIDIA.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long>{

}
