package com.example.NVIDIA.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "unit_in_stock")
    private int unitInStock;

    @Column(name = "unit_in_order")
    private int unitInOrder;

    @Column(name = "product_name", length = 255)
    private String productName;

    @Column(name = "product_status", length = 255)
    private boolean status;
    
    
    @ManyToOne
    @JoinColumn(name = "manufacturer_id")
    @JsonBackReference(value="manufacturer-product") 
    private Manufacturer manufacturer;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference(value="category-product") 
    private Category category;
    
    @ManyToOne
    @JoinColumn(name="promotion_id")
    @JsonBackReference(value="promotion-product") 
    private Promotion promotion;
    
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL,fetch = FetchType.EAGER , orphanRemoval = true)
    @JsonManagedReference(value="product-image") 
    private List<ImageCloud> product_image;
    
    @OneToMany(mappedBy="product",cascade = CascadeType.ALL,fetch = FetchType.EAGER , orphanRemoval = true)
    @JsonManagedReference(value="product-review")
    private List<Review> review;
    
   @OneToMany(mappedBy="product",cascade = CascadeType.ALL,fetch = FetchType.EAGER  , orphanRemoval = true) 
   @JsonManagedReference(value="product-specification")
   private List<Specification> specification;
}

