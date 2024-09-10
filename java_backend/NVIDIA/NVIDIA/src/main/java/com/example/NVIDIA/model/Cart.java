package com.example.NVIDIA.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="cart")
public class Cart {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	  private double totalQuantity;
	    private double totalPrice;   
	    private boolean status;
	
	    @ManyToMany(fetch = FetchType.LAZY)
	    @JoinTable(
	        name = "cart_products", 
	        joinColumns = @JoinColumn(name = "cart_id"),
	        inverseJoinColumns = @JoinColumn(name = "product_id")
	    )
	    private List<Product> products;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	@JsonBackReference(value="user-cart")
	private User user;
	
}


