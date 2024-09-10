package com.example.NVIDIA.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="card_item")
public class CartItem {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private int quantity;

    private Double totalPrice;
	
	private Double unitPrice;
	
	@ManyToOne
	@JoinColumn(name="cart_id" , referencedColumnName = "id")
	private Cart cart;
	
	@ManyToOne
	@JoinColumn(name="product_id" , referencedColumnName="id")
	private Product product;


}
