package com.example.NVIDIA.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.model.Invoice;
import com.example.NVIDIA.dto.InvoiceDTO;
import com.example.NVIDIA.mapper.InvoiceDTOMapper;
import com.example.NVIDIA.repository.InvoiceRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.InvoiceService;

@Service
public class InvoiceServiceImpl implements InvoiceService {

	@Autowired
	private InvoiceRepository invoiceRepository;
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	private InvoiceDTOMapper invoiceDTOMapper;
	
	@Override
	public Invoice getById(Long id) {
		return invoiceRepository.findById(id).orElseThrow(()-> new RuntimeException("cannot found invoice"));
	}

	@Override
	public List<Invoice> getALl() {
		
		return invoiceRepository.findAll();
	}

	@Override
	public InvoiceDTO create(InvoiceDTO invoiceDTO) {
		Invoice invoice=new Invoice();
		invoice.setCustomer(userRepository.findById(invoiceDTO.getCustomer().getId()).orElseThrow(()->new RuntimeException("Cannot found customer")));
		invoice.setEmployee(userRepository.findById(invoiceDTO.getEmployee().getId()).orElseThrow(()->new RuntimeException("Cannot found employee")));
		invoice.setIssueDate(invoiceDTO.getIssueDate());
		invoice.setTotalAmount(invoiceDTO.getTotalAmount());
		Invoice saveInvoice=invoiceRepository.save(invoice);
		return invoiceDTOMapper.apply(saveInvoice);
	}

	@Override
	public InvoiceDTO update(Long id, InvoiceDTO invoiceDTO) {
		Invoice invoice=invoiceRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found Invoice"));
		invoice.setCustomer(userRepository.findById(invoiceDTO.getCustomer().getId()).orElseThrow(()->new RuntimeException("Cannot found customer")));
		invoice.setEmployee(userRepository.findById(invoiceDTO.getEmployee().getId()).orElseThrow(()->new RuntimeException("Cannot found employee")));
		invoice.setIssueDate(invoiceDTO.getIssueDate());
		invoice.setTotalAmount(invoiceDTO.getTotalAmount());
		Invoice updateInvoice=invoiceRepository.save(invoice);
		return invoiceDTOMapper.apply(updateInvoice);
	}

	@Override
	public void delete(Long id) {
		invoiceRepository.deleteById(id);
		
	}

}
