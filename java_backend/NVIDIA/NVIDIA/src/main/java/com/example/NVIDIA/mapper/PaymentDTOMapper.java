package com.example.NVIDIA.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.PaymentDTO;
import com.example.NVIDIA.model.Payment;

@Component
public class PaymentDTOMapper implements Function<Payment,PaymentDTO> {

	@Override
	public PaymentDTO apply(Payment payment) {

		return new PaymentDTO(
				payment.getNameOnCard(),
				payment.getCardNumber(),
				payment.getExpiringDate(),
				payment.getCvc(),
				payment.getMobile(),
				payment.getAddress(),
				payment.getRecipent(),
				payment.getUser()
				);
	}

}
