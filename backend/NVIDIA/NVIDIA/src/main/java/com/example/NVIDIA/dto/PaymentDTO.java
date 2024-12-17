package com.example.NVIDIA.dto;

import java.util.Date;
import java.util.List;

import com.example.NVIDIA.model.CreditCardPayment;
import com.example.NVIDIA.model.Order;
import com.example.NVIDIA.model.PaymentMethod;
import com.example.NVIDIA.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
	private Date payment_date;
	private Double total_price;
	private PaymentMethod payment_method;
	private String payment_status;
//	private BasicUserDTO user;
//	private List<OrderDTO> order;
	private CreditCardPaymentDTO creditCardPayment;
}
