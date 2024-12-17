package com.example.NVIDIA.mapper;

import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.BasicProductDTO;
import com.example.NVIDIA.dto.OrderItemDTO;
import com.example.NVIDIA.model.OrderItem;
import com.example.NVIDIA.model.Product;

@Component
public class OrderItemDTOMapper implements Function<OrderItem,OrderItemDTO>{

	@Override
	public OrderItemDTO apply(OrderItem orderItem) {

		return new OrderItemDTO(
				orderItem.getId(),
				orderItem.getQuanitty(),
				orderItem.getTotalPrice(),
				mapToBasicProductDTO(orderItem.getProduct())
				);
		
	}
    private BasicProductDTO mapToBasicProductDTO(Product product) {
        if (product == null) {
            return null;
        }
        return new BasicProductDTO(
            product.getId(),
            product.getUnitPrice(),
            product.getUnitInStock(),
            product.getUnitInOrder(),
            product.getProductName(),
            product.isStatus(),
            product.getProduct_image().stream().collect(Collectors.toList())
        );

}
}
