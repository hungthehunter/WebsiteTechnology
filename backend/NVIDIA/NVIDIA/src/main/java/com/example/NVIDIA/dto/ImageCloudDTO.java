package com.example.NVIDIA.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageCloudDTO {
	private String public_id;
	private String url;
	private String format;
	private boolean isMainImage;
}
