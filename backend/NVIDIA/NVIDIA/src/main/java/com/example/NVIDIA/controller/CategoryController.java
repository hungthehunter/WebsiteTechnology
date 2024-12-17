package com.example.NVIDIA.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.CategoryDTO;
import com.example.NVIDIA.model.Category;
import com.example.NVIDIA.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
        CategoryDTO category = categoryService.getById(id);
        return ResponseEntity.ok(category);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAll();
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(
    		@RequestPart("category") Category categoryDTO,
    		@RequestParam(value="file", required = false) MultipartFile file
    		) throws IOException {
        Category createdCategory = categoryService.create(categoryDTO,file);
        return ResponseEntity.ok(createdCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(
            @PathVariable Long id,
            @RequestPart("category") Category categoryDTO,
            @RequestParam(value="file" , required = false) MultipartFile file
    		) throws IOException{
        Category updatedCategory = categoryService.update(id, categoryDTO,file);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) throws IOException{
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

