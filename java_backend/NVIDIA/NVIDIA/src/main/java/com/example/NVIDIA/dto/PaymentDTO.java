package com.example.NVIDIA.dto;

import java.sql.Date;
import com.example.NVIDIA.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
	
	private String nameOnCard;
	private String cardNumber;
	private Date expiringDate;
	private String cvc;
	private String mobile;
	private String address;
	private String recipent;
	private User user;
	
}
