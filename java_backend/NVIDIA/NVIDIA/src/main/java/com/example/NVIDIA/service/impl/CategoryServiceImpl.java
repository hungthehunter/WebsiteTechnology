package com.example.NVIDIA.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.dto.CategoryDTO;
import com.example.NVIDIA.mapper.CategoryDTOMapper;
import com.example.NVIDIA.model.Category;
import com.example.NVIDIA.repository.CategoryRepository;
import com.example.NVIDIA.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryDTOMapper categoryDTOMapper;

    @Override
    public Category getById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find category"));
     
    }

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryDTO create(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setCategoryName(categoryDTO.getCategoryName());
        Category savedCategory = categoryRepository.save(category);
        return categoryDTOMapper.apply(savedCategory);
    }

    @Override
    public CategoryDTO update(Long id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find category"));
        category.setCategoryName(categoryDTO.getCategoryName());
        Category updatedCategory = categoryRepository.save(category);
        return categoryDTOMapper.apply(updatedCategory);
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
