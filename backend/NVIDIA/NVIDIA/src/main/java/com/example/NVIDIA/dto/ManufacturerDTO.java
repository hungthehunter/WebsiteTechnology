package com.example.NVIDIA.dto;

import java.util.Date;
import java.util.List;

import com.example.NVIDIA.model.ImageCloud;
import com.example.NVIDIA.model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManufacturerDTO {
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
    private ImageCloud imageCloud;
    private List<Product> products;

}
