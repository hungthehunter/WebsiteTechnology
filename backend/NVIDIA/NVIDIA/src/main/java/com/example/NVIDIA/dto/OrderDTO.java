package com.example.NVIDIA.dto;

import java.util.Date;
import java.util.List;

import com.example.NVIDIA.model.Address;
import com.example.NVIDIA.model.OrderItem;
import com.example.NVIDIA.model.Payment;
import com.example.NVIDIA.model.ProcessingStates;
import com.example.NVIDIA.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
private Long id;
private Date order_date;
private Double total_price;
private boolean status;
private Address address;
private String note;
private ProcessingStates order_status;
private List<OrderItemDTO> orderItem;
private BasicPaymentDTO payment;
private BasicUserDTO user;
}
