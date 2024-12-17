package com.example.NVIDIA.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImportItemDTO {
    private Long id;
    private int quantity;

    private Double price;
    private Double total;

    private BasicProductDTO product;
}
