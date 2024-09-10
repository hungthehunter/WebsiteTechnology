package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.CategoryDTO;
import com.example.NVIDIA.model.Category;

public interface CategoryService {
List<Category> getAll();
Category getById(Long id);
CategoryDTO update(Long id , CategoryDTO categoryDTO);
CategoryDTO create(CategoryDTO categoryDTO);
void delete(Long id);
}
