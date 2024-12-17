package com.example.NVIDIA.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="category")
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String description;
	private boolean status;
	
	 @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER ,orphanRemoval = true)
	 @JoinColumn(name = "image_id")  
	 @JsonManagedReference(value="category-image")
	 private ImageCloud imageCloud;
	 
	 @ManyToOne
	 @JoinColumn(name="promotion_id")
	 @JsonBackReference(value="promotion-category")
	 private Promotion promotion;
	 
	 @OneToMany(mappedBy = "category")
	 @JsonManagedReference(value="category-product")
	 private List<Product> products;
	 
}

