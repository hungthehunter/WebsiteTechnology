package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.AddressDTO;
import com.example.NVIDIA.model.Address;

public interface AddressService {
	List<Address> getAll();
	Address getById(Long id);
	AddressDTO update(Long id , AddressDTO AddressDTO);
	AddressDTO create(AddressDTO AddressDTO);
	void delete(Long id);
}
