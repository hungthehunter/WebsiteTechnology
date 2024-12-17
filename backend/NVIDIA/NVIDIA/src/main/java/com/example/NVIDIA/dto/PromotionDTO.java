package com.example.NVIDIA.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import com.example.NVIDIA.model.Category;
import com.example.NVIDIA.model.ImageCloud;
import com.example.NVIDIA.model.Product;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionDTO {
    private Long id;
    private String name;
    private String description;
    private Double discountPercentage;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ProductDTO> applicableProducts;   
    private List<CategoryDTO> applicableCategories;
    private ImageCloud imageCloud;
}
