package com.example.NVIDIA.mapper;

import java.util.function.Function;

import com.example.NVIDIA.dto.OrderDTO;
import com.example.NVIDIA.model.Order;
import org.springframework.stereotype.Component;
@Component
public class OrderDTOMapper implements Function<Order,OrderDTO>{

	@Override
	public OrderDTO apply(Order order) {
		
		return new OrderDTO(
				order.getDeliveryAddress(),
				order.getNote(),
				order.getRecipientName(),
				order.getRecipientPhone(),
				order.getOrder_status(),
				order.getOrder_date(),
				order.getDelivery_date(),
				order.getReceipt_date()
//				order.getCustomer()
				);
	}

}
