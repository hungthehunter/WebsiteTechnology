package com.example.NVIDIA.service.impl;

import com.example.NVIDIA.dto.CartItemDTO;
import com.example.NVIDIA.mapper.CartItemDTOMapper;
import com.example.NVIDIA.model.CartItem;
import com.example.NVIDIA.repository.CartItemRepository;
import com.example.NVIDIA.repository.CartRepository;
import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
@Component
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemDTOMapper cartItemDTOMapper;

    @Override
    public CartItem getCartItemById(Long id) {
       return cartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("CartItem not found"));
       
    }

    @Override
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    @Override
    public CartItemDTO createCartItem(CartItemDTO cartItemDTO) {
        CartItem cartItem = new CartItem();
        cartItem.setQuantity(cartItemDTO.getQuantity());
        cartItem.setTotalPrice(cartItemDTO.getTotalPrice());
        cartItem.setUnitPrice(cartItemDTO.getUnitPrice());
        cartItem.setCart(cartRepository.findById(cartItemDTO.getCart().getId()).orElseThrow(() -> new RuntimeException("Cart not found")));
        cartItem.setProduct(productRepository.findById(cartItemDTO.getProduct().getId()).orElseThrow(() -> new RuntimeException("Product not found")));
        cartItem = cartItemRepository.save(cartItem);
        return cartItemDTOMapper.apply(cartItem);
    }

    @Override
    public CartItemDTO updateCartItem(Long id, CartItemDTO cartItemDTO) {
        CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("CartItem not found"));
        cartItem.setQuantity(cartItemDTO.getQuantity());
        cartItem.setTotalPrice(cartItemDTO.getTotalPrice());
        cartItem.setUnitPrice(cartItemDTO.getUnitPrice());
        cartItem.setProduct(productRepository.findById(cartItemDTO.getProduct().getId()).orElseThrow(() -> new RuntimeException("Product not found")));
        cartItem.setCart(cartRepository.findById(cartItemDTO.getCart().getId()).orElseThrow(() -> new RuntimeException("Cart not found")));
        cartItem = cartItemRepository.save(cartItem);
        return cartItemDTOMapper.apply(cartItem);
    }

    @Override
    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }
}
