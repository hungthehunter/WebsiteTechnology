package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.InvoiceDTO;
import com.example.NVIDIA.model.Invoice;

public interface InvoiceService {
Invoice getById(Long id);
List<Invoice> getALl();
InvoiceDTO create(InvoiceDTO invoiceDTO);
InvoiceDTO update(Long id, InvoiceDTO invoiceDTO);
void delete(Long id);
}
