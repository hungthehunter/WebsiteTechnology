package com.example.NVIDIA.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name="image_cloud")
public class ImageCloud {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

private String public_id;
private String url;
private String format;
private boolean isMainImage;

@ManyToOne
@JoinColumn(name="product_id",referencedColumnName = "id")
@JsonBackReference(value="product-image")
private Product product;

@OneToOne(mappedBy="imageCloud")
@JsonBackReference(value="category-image")
private Category category;

@OneToOne(mappedBy="imageCloud")
@JsonBackReference(value="manufacturer-image")
private Manufacturer manufacturer;

@OneToOne(mappedBy="imageCloud")
@JsonBackReference(value="promotion-image")
private Promotion promotion;

}