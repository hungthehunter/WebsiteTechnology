package com.example.NVIDIA.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.ImageCloudDTO;
import com.example.NVIDIA.model.ImageCloud;

@Component
public class ImageCloudDTOMapper implements Function<ImageCloud,ImageCloudDTO>{

	@Override
	public ImageCloudDTO apply(ImageCloud imageCloud) {
		return new ImageCloudDTO(
				imageCloud.getPublic_id(),
				imageCloud.getUrl(),
				imageCloud.getFormat(),
				imageCloud.isMainImage()
				);
	}

}
