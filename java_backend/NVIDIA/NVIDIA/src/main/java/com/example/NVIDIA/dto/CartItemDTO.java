package com.example.NVIDIA.dto;

import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
    private int quantity;
    private Double totalPrice;
    private Double unitPrice;
    private Cart cart;
    private Product product;

}
