package com.example.NVIDIA.model;
import java.util.List;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="product_image")
public class ProductImage {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name = "main_picture")
	    private String mainPicture;

	    @ElementCollection
	    @CollectionTable(name = "product_image_list",
	                     joinColumns = @JoinColumn(name = "image_id"))
	    @Column(name = "picture")
	    private List<String> listProductPicture;
}
