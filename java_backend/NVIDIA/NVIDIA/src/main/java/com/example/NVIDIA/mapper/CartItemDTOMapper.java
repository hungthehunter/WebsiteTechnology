package com.example.NVIDIA.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.CartItemDTO;
import com.example.NVIDIA.model.CartItem;

@Component
public class CartItemDTOMapper implements Function<CartItem,CartItemDTO>{


	
	@Override
	public CartItemDTO apply(CartItem cartItem) {
	    return new CartItemDTO(
	    	    cartItem.getQuantity(),
	    	    cartItem.getTotalPrice(),
	    	    cartItem.getProduct().getUnitPrice(),
	    	    cartItem.getCart(),
	    		cartItem.getProduct()
        );
	}

}
