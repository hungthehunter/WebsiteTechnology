package com.example.NVIDIA.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.ModelMap;

import com.cloudinary.Cloudinary;

@Configuration
public class ProjectConfiguration {

	@Bean
	public ModelMap mapper() {
		return new ModelMap();
	}
	
	@Bean
	public Cloudinary getCloudinary() {
		Map config =new HashMap();
		config.put("cloud_name", "dy53gt8yd");
		config.put("api_key", "813412465854191");
		config.put("api_secret", "viw4Cj4AdDCdxanT3on4uEiQgJ4");
		config.put("secure", true);
		return new Cloudinary(config);
	}
}
