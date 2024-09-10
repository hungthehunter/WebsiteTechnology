package com.example.NVIDIA.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "main_image")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MainImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
	@JsonBackReference
    private Product product;

    @OneToOne
    @JoinColumn(name = "image_data_id", referencedColumnName = "id")
    private ImageData imageData;
}
