package com.example.NVIDIA.model;
import java.util.Date;
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
@NoArgsConstructor
@AllArgsConstructor
@Table(name="manufacturer")
public class Manufacturer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String country;
	private String website;
	private String description;
	private String email;
	private String phone;
	private String address;
	private Date createdAt; 
	private Date updatedAt;
	private boolean status;
	
    @OneToMany(mappedBy = "manufacturer")
    @JsonManagedReference(value="manufacturer-product")
    private List<Product> products;
    
	 @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER ,orphanRemoval = true)
	 @JoinColumn(name = "image_id")  
	 @JsonManagedReference(value="manufacturer-image")
	 private ImageCloud imageCloud;
	
}
