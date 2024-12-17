package com.example.NVIDIA.dto;

import java.util.Date;

import com.example.NVIDIA.model.ImageCloud;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicManufacturerDTO {
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
    private ImageCloud imageCloud;
}
