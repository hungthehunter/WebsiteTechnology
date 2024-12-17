package com.example.NVIDIA.mapper;

import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.BasicManufacturerDTO;
import com.example.NVIDIA.dto.ImportDTO;
import com.example.NVIDIA.model.Import;
import com.example.NVIDIA.model.Manufacturer;

@Component
public class ImportDTOMapper implements Function<Import, ImportDTO> {
    @Autowired
    private ImportItemDTOMapper importItemDTOMapper;

    @Override
    public ImportDTO apply(Import model) {
        Manufacturer manufacturer = model.getManufacturer();
        BasicManufacturerDTO manufacturerDTO = null;
        if (manufacturer != null) {
            manufacturerDTO = new BasicManufacturerDTO(
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
                    manufacturer.getImageCloud()
                );
        }

        return new ImportDTO(
                model.getId(),
                model.getTotal(),
                model.getDateImport(),
                manufacturerDTO,
                model.getImportItems().stream()
                        .map(importItem -> importItemDTOMapper.apply(importItem))
                        .collect(Collectors.toList()));
    }
}
