package com.example.NVIDIA.mapper;
import java.util.function.Function;
import java.util.stream.Collectors;
import com.example.NVIDIA.dto.CartDTO;

import com.example.NVIDIA.model.Cart;
import org.springframework.stereotype.Component;
@Component
public class CartDTOMapper implements Function<Cart, CartDTO> {


	
    @Override
    public CartDTO apply(Cart cart) {
        return new CartDTO(
          cart.getTotalQuantity(),
          cart.getTotalPrice(),
          cart.getUser(),
          cart.getProducts().stream().collect(Collectors.toList())
     
        );
    }
}
