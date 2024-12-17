package com.example.NVIDIA.model;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name="promotion")
@NoArgsConstructor
@AllArgsConstructor
public class Promotion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String description;
private Double discountPercentage;
private LocalDateTime startDate;
private  LocalDateTime endDate;
private boolean isActive;
private LocalDateTime createdAt;
private LocalDateTime updatedAt;

@OneToMany(mappedBy = "promotion",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
@JsonManagedReference(value="promotion-product")
private List<Product> applicableProducts;

@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER,mappedBy = "promotion")
@JsonManagedReference(value="promotion-category")
private List<Category> applicableCategories;

@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER ,orphanRemoval = true)
@JoinColumn(name = "image_id")  
@JsonManagedReference(value="promotion-image")
private ImageCloud imageCloud;
}
