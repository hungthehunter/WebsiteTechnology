package com.example.NVIDIA.dto;
import java.util.Date;
import com.example.NVIDIA.model.PaymentMethod;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicPaymentDTO {
	private Date payment_date;
	private Double total_price;
	private PaymentMethod payment_method;
	private String payment_status;
//	private BasicUserDTO user;
//	private List<OrderDTO> order;
	private CreditCardPaymentDTO creditCardPayment;
}
