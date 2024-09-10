package com.example.NVIDIA.dto;

import com.example.NVIDIA.model.Order;
import com.example.NVIDIA.model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDTO {
	private double unitPrice;
	private int quantity;
	private Order order;
	private Product product;
}
