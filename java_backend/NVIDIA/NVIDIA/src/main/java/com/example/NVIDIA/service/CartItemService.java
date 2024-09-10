package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.CartItemDTO;
import com.example.NVIDIA.model.CartItem;

public interface CartItemService {
    CartItem getCartItemById(Long id);
    List<CartItem> getAllCartItems();
    CartItemDTO createCartItem(CartItemDTO cartItemDTO);
    CartItemDTO updateCartItem(Long id, CartItemDTO cartItemDTO);
    void deleteCartItem(Long id);
}
