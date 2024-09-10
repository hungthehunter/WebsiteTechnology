package com.example.NVIDIA.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.dto.PaymentDTO;
import com.example.NVIDIA.mapper.PaymentDTOMapper;
import com.example.NVIDIA.model.Payment;
import com.example.NVIDIA.repository.PaymentRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService{

	
	@Autowired
	private PaymentRepository paymentRepository;
	
	@Autowired
	private PaymentDTOMapper paymentDTOMapper;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Override
	public Payment getById(Long id) {
		return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find your payment"));
	}

	@Override
	public List<Payment> getAll() {
	
		return paymentRepository.findAll();
	}

	@Override
	public PaymentDTO create(PaymentDTO PaymentDTO) {
		Payment payment=new Payment();
		payment.setCardNumber(PaymentDTO.getCardNumber());
		payment.setCvc(PaymentDTO.getCvc());
		payment.setExpiringDate(PaymentDTO.getExpiringDate());
		payment.setNameOnCard(PaymentDTO.getNameOnCard());
		payment.setUser(userRepository.findById(PaymentDTO.getUser().getId()).orElseThrow(()->new RuntimeException("Cannot found user")));
		payment.setMobile(PaymentDTO.getMobile());
		payment.setAddress(PaymentDTO.getAddress());
		payment.setRecipent(PaymentDTO.getRecipent());
		Payment savePayment=paymentRepository.save(payment);
		
		return paymentDTOMapper.apply(savePayment);
	}

	@Override
	public PaymentDTO update(Long id, PaymentDTO PaymentDTO) {
		Payment payment=paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find your payment"));
		payment.setCardNumber(PaymentDTO.getCardNumber());
		payment.setCvc(PaymentDTO.getCvc());
		payment.setExpiringDate(PaymentDTO.getExpiringDate());
		payment.setNameOnCard(PaymentDTO.getNameOnCard());
		payment.setUser(userRepository.findById(PaymentDTO.getUser().getId()).orElseThrow(()->new RuntimeException("Cannot found user")));
		payment.setMobile(PaymentDTO.getMobile());
		payment.setAddress(PaymentDTO.getAddress());
		payment.setRecipent(PaymentDTO.getRecipent());
		Payment savePayment=paymentRepository.save(payment);
		return paymentDTOMapper.apply(savePayment);
	}

	@Override
	public void delete(Long id) {
		paymentRepository.deleteById(id);
		
	}

}
