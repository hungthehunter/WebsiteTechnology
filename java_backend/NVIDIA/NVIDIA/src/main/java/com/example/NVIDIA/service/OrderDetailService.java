package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.OrderDetailDTO;
import com.example.NVIDIA.model.OrderDetail;

public interface OrderDetailService {
OrderDetail getById(Long id);
List<OrderDetail> getAll();
OrderDetailDTO create(OrderDetailDTO orderDetailDTO);
OrderDetailDTO update(Long id,OrderDetailDTO orderDetailDTO);
void delete(Long id);
}
