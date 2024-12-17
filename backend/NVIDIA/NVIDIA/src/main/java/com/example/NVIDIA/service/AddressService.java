package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.AddressDTO;
import com.example.NVIDIA.model.Address;

public interface AddressService {
	List<AddressDTO> getAll();
	AddressDTO getById(Long id);
	Address update(Long id , Address AddressDTO);
	Address create(Address AddressDTO);
	void delete(Long id);
}
