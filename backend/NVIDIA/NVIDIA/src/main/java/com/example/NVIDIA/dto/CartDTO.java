package com.example.NVIDIA.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
	private Long id;
	private BasicUserDTO user;
	private BasicProductDTO product; 
    private int quantity;
    private double totalPrice; 
    private boolean status;
}
