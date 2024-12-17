package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.CartDTO;
import com.example.NVIDIA.model.Cart;

public interface CartService {
    CartDTO getCartById(Long id);
    List<CartDTO> getCartByUserId(Long userId);
    List<CartDTO> getAllCarts();
    Cart createCart(CartDTO cartDTO);
    Cart updateCart(Long id, CartDTO cartDTO);
    void deleteCart(Long id);
}
