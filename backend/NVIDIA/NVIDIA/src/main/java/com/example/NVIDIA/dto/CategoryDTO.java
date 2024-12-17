package com.example.NVIDIA.dto;
import java.util.List;

import com.example.NVIDIA.model.ImageCloud;
import com.example.NVIDIA.model.Promotion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;
    private String name;
    private String description; 
    private boolean status;
    private BasicPromotionDTO promotion;
    private ImageCloud imageCloud;
    private List<BasicProductDTO> products;
}
