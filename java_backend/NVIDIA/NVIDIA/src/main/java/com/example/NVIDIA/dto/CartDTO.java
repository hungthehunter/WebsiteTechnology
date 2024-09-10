package com.example.NVIDIA.dto;
import java.util.List;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private double totalQuantity; // Added total quantity
    private double totalPrice; 
    private User user;
    private List<Product> products; 
}
