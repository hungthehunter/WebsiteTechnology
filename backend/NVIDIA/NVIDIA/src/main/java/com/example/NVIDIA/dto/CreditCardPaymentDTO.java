package com.example.NVIDIA.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditCardPaymentDTO {
	private Long id;
    private String cardNumber;
    private String cardHolderName;
    private String cardExpiryDate;
    private String cvv;
}
