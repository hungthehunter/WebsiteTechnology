package com.example.NVIDIA.mapper;

import java.util.function.Function;

import com.example.NVIDIA.dto.OrderDetailDTO;
import com.example.NVIDIA.model.OrderDetail;
import org.springframework.stereotype.Component;
@Component
public class OrderDetailDTOMapper implements Function<OrderDetail,OrderDetailDTO> {

	@Override
	public OrderDetailDTO apply(OrderDetail orderDetail) {
		return new OrderDetailDTO(
				orderDetail.getUnitPrice(),
				orderDetail.getQuantity(),
				orderDetail.getOrder(),
				orderDetail.getProduct()
				);
	}

}
