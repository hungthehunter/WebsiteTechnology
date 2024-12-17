package com.example.NVIDIA.controller;

import com.example.NVIDIA.dto.CartDTO;
import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody CartDTO cartDTO) {
        Cart createdCart = cartService.createCart(cartDTO);
        return ResponseEntity.ok(createdCart);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable Long id, @RequestBody CartDTO cartDTO) {
        Cart updatedCart = cartService.updateCart(id, cartDTO);
        return ResponseEntity.ok(updatedCart);
    }
    
    @GetMapping(value = "/{id}")
    public ResponseEntity<CartDTO> getCartById(@PathVariable Long id) {
        CartDTO cart = cartService.getCartById(id);
        return ResponseEntity.ok(cart);
    }
    
    @GetMapping
    public ResponseEntity<List<CartDTO>> getAllCarts() {
        List<CartDTO> cart = cartService.getAllCarts();
        return ResponseEntity.ok(cart);
    }
    
    @GetMapping("/user/{id}")
    public ResponseEntity<List<CartDTO>> getCartByUserId(@PathVariable Long id) {
        List<CartDTO> cartItems = cartService.getCartByUserId(id);
        return ResponseEntity.ok(cartItems);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();
    }
    
}
