package com.example.NVIDIA.model;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cpu", length = 255)
    private String cpu;
    
    @Column(name="gpu", length=255)
    private String gpu;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "unit_in_stock")
    private int unitInStock;

    @Column(name = "unit_in_order")
    private int unitInOrder;

    @Column(name = "battery_capacity", length = 255)
    private String batteryCapacity;

    @Column(name = "operating_system", length = 255)
    private String operatingSystem;

    @Column(name = "screen", length = 255)
    private String screen;

    @Column(name = "ram", length = 255)
    private String ram;

    @Column(name = "product_name", length = 255)
    private String productName;

    @Column(name = "design", length = 255)
    private String design;

    @Column(name = "warranty_information", length = 255)
    private String warrantyInformation;

    @Column(name = "general_information", length = 255)
    private String generalInformation;

    @Column(name = "product_status", length = 255)
    private String status;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "manufacturer_id", referencedColumnName = "id")
    private Manufacturer manufacturer;
    
    @ManyToOne
    @JoinColumn(name = "promotion_id", referencedColumnName = "id")
    private Promotion promotion;
    
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference(value="product-image")
    private List<ImageData> product_image;

    @Transient
    private ImageData mainImage;
    
    @Override
    public int hashCode() {
        return Objects.hash(id, cpu, gpu, unitPrice, unitInStock, unitInOrder, batteryCapacity, 
                            operatingSystem, screen, ram, productName, design, 
                            warrantyInformation, generalInformation, status, category, 
                            manufacturer, promotion);
    }




}
