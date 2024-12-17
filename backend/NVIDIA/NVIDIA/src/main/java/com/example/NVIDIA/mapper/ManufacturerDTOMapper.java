package com.example.NVIDIA.mapper;

import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.ManufacturerDTO;
import com.example.NVIDIA.model.Manufacturer;

@Component
public class ManufacturerDTOMapper implements Function<Manufacturer, ManufacturerDTO> {

    @Override
    public ManufacturerDTO apply(Manufacturer manufacturer) {
        return new ManufacturerDTO(
            manufacturer.getId(),
            manufacturer.getName(),
            manufacturer.getCountry(),
            manufacturer.getWebsite(),
            manufacturer.getDescription(),
            manufacturer.getEmail(),
            manufacturer.getPhone(),
            manufacturer.getAddress(),
            manufacturer.getCreatedAt(),
            manufacturer.getUpdatedAt(),
            manufacturer.isStatus(),
            manufacturer.getImageCloud(),
          manufacturer.getProducts().stream().collect(Collectors.toList())
        );
    }
}
