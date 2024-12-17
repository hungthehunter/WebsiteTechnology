package com.example.NVIDIA.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImportDTO {
    private Long id;
    private Double total;
    private Date dateImport;

    private BasicManufacturerDTO manufacturer;
    private List<ImportItemDTO> importItems;
}