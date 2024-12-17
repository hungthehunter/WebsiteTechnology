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

import com.example.NVIDIA.dto.UserDTO;
import com.example.NVIDIA.model.User;
import com.example.NVIDIA.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
	
	
	@Autowired
	private AdminService AdminService;
	
	 @GetMapping("/{id}")
	    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
	        UserDTO UserDTO = AdminService.getById(id);
	        return ResponseEntity.ok(UserDTO);
	    }

	    @GetMapping("/listUsers")
	    public ResponseEntity<List<UserDTO>> getAllUser() {
	        List<UserDTO> Users = AdminService.getAll();
	        return ResponseEntity.ok(Users);
	    }
	    
	    @GetMapping("/listEmployees")
	    public ResponseEntity<List<User>> getAllEmployee() {
	        List<User> Users = AdminService.getAllEmployees();
	        return ResponseEntity.ok(Users);
	    }
	    
	    @GetMapping("/listCustomers")
	    public ResponseEntity<List<User>> getAllCustomer() {
	        List<User> Users = AdminService.getAllCustomers();
	        return ResponseEntity.ok(Users);
	    }

	    @PostMapping
	    public ResponseEntity<User> createUser(@RequestBody User UserDTO) {
	        User createdUser = AdminService.create(UserDTO);
	        return ResponseEntity.ok(createdUser);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO UserDTO) {
	        UserDTO updatedUser = AdminService.update(id, UserDTO);
	        return ResponseEntity.ok(updatedUser);
	    }
	    
	    @PutMapping("/update/{id}")
	    public ResponseEntity<UserDTO> updateInfoUser(@PathVariable Long id, @RequestBody UserDTO UserDTO) {
	        UserDTO updatedUser = AdminService.updateInfo(id, UserDTO);
	        return ResponseEntity.ok(updatedUser);
	    }

	    @PutMapping("/address/{id}")
	    public ResponseEntity<UserDTO> updateUserAddress(@PathVariable Long id, @RequestBody UserDTO UserDTO) {
	        UserDTO updatedUser = AdminService.addAddress(id, UserDTO);
	        return ResponseEntity.ok(updatedUser);
	    }
	    
	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
	        AdminService.delete(id);
	        return ResponseEntity.noContent().build();
	    }
	    
	    



}
