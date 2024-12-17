package com.example.NVIDIA.service;
import java.util.List;
import com.example.NVIDIA.dto.PaymentDTO;
import com.example.NVIDIA.model.Payment;


public interface PaymentService {
	PaymentDTO getById(Long id);
	List<PaymentDTO> getAll();
	Payment create(Payment PaymentDTO);
	Payment update(Long id,Payment PaymentDTO);
	void delete(Long id);
}
