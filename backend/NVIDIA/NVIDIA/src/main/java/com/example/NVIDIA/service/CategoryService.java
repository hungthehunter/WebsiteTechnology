package com.example.NVIDIA.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.CategoryDTO;
import com.example.NVIDIA.model.Category;



public interface CategoryService {
    CategoryDTO getById(Long id);
    List<CategoryDTO> getAll();
    Category create( Category  categoryDTO,MultipartFile file) throws IOException;
    Category update(Long id,  Category categoryDTO,MultipartFile file) throws IOException;
    void delete(Long id) throws IOException;
}
