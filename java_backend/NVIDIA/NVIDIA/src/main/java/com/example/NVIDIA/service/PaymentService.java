package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.PaymentDTO;
import com.example.NVIDIA.model.Payment;


public interface PaymentService {
	Payment getById(Long id);
	List<Payment> getAll();
	PaymentDTO create(PaymentDTO PaymentDTO);
	PaymentDTO update(Long id,PaymentDTO PaymentDTO);
	void delete(Long id);
}
