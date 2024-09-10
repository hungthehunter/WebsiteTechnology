package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.CartDTO;
import com.example.NVIDIA.model.Cart;

public interface CartService {
    Cart getCartById(Long id);
    List<Cart> getAllCarts();
    CartDTO createCart(CartDTO cartDTO);
    CartDTO updateCart(Long id, CartDTO cartDTO);
    void deleteCart(Long id);
    List<Cart> findCartsByUserId(Long userId);
    List<Cart> findCartsHasSeen(Long userId);
    List<Cart> findAllCartsHasHandled();
    void RemoveCartProduct(Long userId,Long productId);
}
