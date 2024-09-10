package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.OrderDTO;
import com.example.NVIDIA.model.Order;

public interface OrderService {
	Order getById(Long id);
	List<Order> getAll();
	OrderDTO create(OrderDTO orderDTO);
	OrderDTO update(Long id,OrderDTO orderDTO);
	OrderDTO updateStatus(Long id, OrderDTO orderDTO);
	void delete(Long id);
//    List<Order> findCartsByUserId(Long userId);
}
