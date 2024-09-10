package com.example.NVIDIA.mapper;

import java.util.function.Function;


import com.example.NVIDIA.dto.InvoiceDTO;
import com.example.NVIDIA.model.Invoice;
import org.springframework.stereotype.Component;
@Component
public class InvoiceDTOMapper implements Function<Invoice,InvoiceDTO>{

	@Override
	public InvoiceDTO apply(Invoice invoice) {
		
		return new InvoiceDTO(
			invoice.getIssueDate(),
				invoice.getTotalAmount(),
				invoice.getCustomer(),
				invoice.getEmployee()
				
				);
				
	}

}
