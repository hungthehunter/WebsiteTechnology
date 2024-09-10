package com.example.NVIDIA.mapper;

import java.util.function.Function;

import com.example.NVIDIA.dto.CategoryDTO;
import com.example.NVIDIA.model.Category;
import org.springframework.stereotype.Component;
@Component
public class CategoryDTOMapper implements Function<Category,CategoryDTO> {

	@Override
	public CategoryDTO apply(Category category) {
		
	return new CategoryDTO(
			category.getCategoryName()
			);
			
	}

}
