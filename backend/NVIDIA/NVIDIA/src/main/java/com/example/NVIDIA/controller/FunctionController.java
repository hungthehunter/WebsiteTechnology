package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.NVIDIA.dto.FunctionDTO;
import com.example.NVIDIA.model.Function;
import com.example.NVIDIA.service.FunctionService;

@RestController
@RequestMapping("/api/functions")
public class FunctionController {

	@Autowired
	private FunctionService functionService;
	
	 @GetMapping("/{id}")
	    public ResponseEntity<FunctionDTO> getFunctionById(@PathVariable Long id) {
	        FunctionDTO FunctionDTO = functionService.getById(id);
	        return ResponseEntity.ok(FunctionDTO);
	    }

	    @GetMapping
	    public ResponseEntity<List<FunctionDTO>> getAllFunctions() {
	        List<FunctionDTO> Functions = functionService.getAll();
	        return ResponseEntity.ok(Functions);
	    }

	    @PostMapping
	    public ResponseEntity<FunctionDTO> createFunction(@RequestBody FunctionDTO FunctionDTO) {
	        FunctionDTO createdFunction = functionService.create(FunctionDTO);
	        return ResponseEntity.ok(createdFunction);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<FunctionDTO> updateFunction(@PathVariable Long id, @RequestBody FunctionDTO FunctionDTO) {
	        FunctionDTO updatedFunction = functionService.update(id, FunctionDTO);
	        return ResponseEntity.ok(updatedFunction);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteFunction(@PathVariable Long id) {
	        functionService.delete(id);
	        return ResponseEntity.noContent().build();
	    }
	
}
