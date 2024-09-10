package com.example.NVIDIA.mapper;

import java.util.function.Function;

import com.example.NVIDIA.dto.ManufacturerDTO;
import com.example.NVIDIA.model.Manufacturer;
import org.springframework.stereotype.Component;
@Component
public class ManufacturerDTOMapper implements Function<Manufacturer,ManufacturerDTO>{

	@Override
	public ManufacturerDTO apply(Manufacturer manufacturer) {
		
		return new ManufacturerDTO(
				manufacturer.getManufacturerName()
				);
	}

}
