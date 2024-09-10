package com.example.NVIDIA.dto;
import java.util.List;

import com.example.NVIDIA.model.Category;
import com.example.NVIDIA.model.ImageData;
import com.example.NVIDIA.model.MainImage;
import com.example.NVIDIA.model.Manufacturer;
import com.example.NVIDIA.model.Promotion;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
	private String cpu;
	private String gpu;
	private Double unitPrice;
	private int unitInStock;
	private int unitInOrder;
	private String batteryCapacity;
	private String operatingSystem;
	private String screen;
	private String ram;
	private String productName;
	private String design;
	private String warrantyInformation;
	private String generalInformation;
	private String status;
	private Category category;
	private Manufacturer manufacturer;
	private Promotion promotion;
	//Image Data
	private List<ImageData> product_image;

}
