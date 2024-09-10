package com.example.NVIDIA.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="ImageData")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageData {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name = "name")
	    private String name;

	    @Column(name = "type")
	    private String type;

	    @Lob
	    @Column(name = "image_data",columnDefinition = "LONGBLOB")
	    private byte[] imageData;

	    @ManyToOne
	    @JoinColumn(name = "product_id")
	    @JsonBackReference(value="product-image")
	    private Product product;

	    @Column(name = "is_main_image", columnDefinition = "BOOLEAN")
	    private Boolean isMainImage;
}
