package com.example.NVIDIA.controller;

import com.example.NVIDIA.dto.CartDTO;
import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;


    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable Long id) {
        Cart cart = cartService.getCartById(id);
        return ResponseEntity.ok(cart);
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cart>> getCartsByUserId(@PathVariable Long userId) {
        List<Cart> carts = cartService.findCartsByUserId(userId);
        return ResponseEntity.ok(carts);
    }
    
    @GetMapping("/cart/{userId}")
    public ResponseEntity<List<Cart>> getAllCartHasSeen(@PathVariable Long userId) {
        List<Cart> carts = cartService.findCartsHasSeen(userId);
        return ResponseEntity.ok(carts);
    }

    @GetMapping("/handle")
    public ResponseEntity<List<Cart>> getAllCartHasHandled() {
        List<Cart> carts = cartService.findAllCartsHasHandled();
        return ResponseEntity.ok(carts);
    }
    
    
    @DeleteMapping("/cart/{userId}/remove/{productId}")
    public ResponseEntity<Void> RemoveCartProduct(@PathVariable Long userId , @PathVariable Long productId) {
        cartService.RemoveCartProduct(userId,productId);
        return ResponseEntity.noContent().build();
    }


    @PostMapping
    public ResponseEntity<CartDTO> createCart(@RequestBody CartDTO cartDTO) {
        CartDTO createdCart = cartService.createCart(cartDTO);
        return ResponseEntity.ok(createdCart);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartDTO> updateCart(@PathVariable Long id, @RequestBody CartDTO cartDTO) {
        CartDTO updatedCart = cartService.updateCart(id, cartDTO);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();
    }
    
//    @PutMapping("delete/{id}")
//    public ResponseEntity<CartDTO> deleteCartAfterPaying(@PathVariable Long id) {
//         cartService.deleteCart(id);
//        return ResponseEntity.noContent().build();
//    }
}
