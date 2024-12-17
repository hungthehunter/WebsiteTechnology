package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.ContactDTO;
import com.example.NVIDIA.model.Contact;

public interface ContactService {
	ContactDTO getById(Long id);
	List<ContactDTO> getALl();
	ContactDTO create(ContactDTO ContactDTO);
	ContactDTO update(Long id, ContactDTO ContactDTO);
	void delete(Long id);
}
