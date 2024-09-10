package com.example.NVIDIA.dto;

import java.sql.Date;
import java.util.List;

import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.model.Order;
import com.example.NVIDIA.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseHistoryDTO {
	private Date purchaseDate;
	private User user;
	private List<Cart> carts;
	private Order orders;
}
