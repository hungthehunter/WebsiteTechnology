package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.ManufacturerDTO;
import com.example.NVIDIA.model.Manufacturer;

public interface ManufacturerService {

	Manufacturer getById(Long id);
	List<Manufacturer> getAll();
	ManufacturerDTO create(	ManufacturerDTO manufacturerDTO);
	ManufacturerDTO update( Long id , ManufacturerDTO manufacturerDTO);
	void delete(Long id);
}
