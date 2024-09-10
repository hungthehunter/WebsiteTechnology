package com.example.NVIDIA.controller;

import com.example.NVIDIA.dto.CartItemDTO;
import com.example.NVIDIA.model.CartItem;
import com.example.NVIDIA.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long id) {
        CartItem cartItemDTO = cartItemService.getCartItemById(id);
        return ResponseEntity.ok(cartItemDTO);
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        List<CartItem> cartItems = cartItemService.getAllCartItems();
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping
    public ResponseEntity<CartItemDTO> createCartItem(@RequestBody CartItemDTO cartItemDTO) {
        CartItemDTO createdCartItem = cartItemService.createCartItem(cartItemDTO);
        return ResponseEntity.ok(createdCartItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItemDTO> updateCartItem(@PathVariable Long id, @RequestBody CartItemDTO cartItemDTO) {
        CartItemDTO updatedCartItem = cartItemService.updateCartItem(id, cartItemDTO);
        return ResponseEntity.ok(updatedCartItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
}
