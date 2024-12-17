package com.example.NVIDIA.mapper;

import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.BasicAddressDTO;
import com.example.NVIDIA.dto.BasicUserDTO;
import com.example.NVIDIA.dto.ExportDTO;
import com.example.NVIDIA.model.Export;
import com.example.NVIDIA.model.User;

@Component
public class ExportDTOMapper implements Function<Export, ExportDTO> {
    @Autowired
    private OrderDTOMapper orderDTOMapper;

    @Override
    public ExportDTO apply(Export export) {
        return new ExportDTO(
                export.getId(),
                export.getDateExport(),
                orderDTOMapper.apply(export.getOrder()));
    }
}
