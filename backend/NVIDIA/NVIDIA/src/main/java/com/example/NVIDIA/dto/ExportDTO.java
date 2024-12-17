package com.example.NVIDIA.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.databind.introspect.TypeResolutionContext.Basic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExportDTO {
    private Long id;

    private Date dateExport;
    private OrderDTO order;
}
