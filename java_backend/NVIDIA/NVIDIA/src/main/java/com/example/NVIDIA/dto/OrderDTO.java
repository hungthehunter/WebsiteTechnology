package com.example.NVIDIA.dto;

import java.sql.Date;

import com.example.NVIDIA.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
	private String deliveryAddress;
	private String note;
	private String recipientName;
	private String recipientPhone;
	private String order_status;
	private Date order_date;
	private Date delivery_date;
	private Date receipt_date;
//	private User customer;

}
