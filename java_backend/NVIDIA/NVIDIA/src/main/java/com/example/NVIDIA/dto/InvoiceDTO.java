package com.example.NVIDIA.dto;

import java.sql.Date;

import com.example.NVIDIA.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO {
private Date issueDate;
private Double totalAmount;
private User customer;
private User employee;
}
