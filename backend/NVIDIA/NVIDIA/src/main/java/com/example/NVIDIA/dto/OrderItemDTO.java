package com.example.NVIDIA.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
	private Long id;
	    private int quantity;       
	    private double totalPrice;       
	    private BasicProductDTO product;
//	    private Order order;
}
