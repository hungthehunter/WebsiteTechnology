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
import com.example.NVIDIA.dto.RoleEntityDTO;
import com.example.NVIDIA.model.RoleEntity;
import com.example.NVIDIA.service.RoleEntityService;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

	@Autowired
	private RoleEntityService roleEntityService;
	
	 @GetMapping("/{id}")
	    public ResponseEntity<RoleEntity> getRoleById(@PathVariable Long id) {
	        RoleEntity RoleDTO = roleEntityService.getById(id);
	        return ResponseEntity.ok(RoleDTO);
	    }

	    @GetMapping
	    public ResponseEntity<List<RoleEntity>> getAllRoles() {
	        List<RoleEntity> Roles = roleEntityService.getAll();
	        return ResponseEntity.ok(Roles);
	    }

	    @PostMapping
	    public ResponseEntity<RoleEntityDTO> createRole(@RequestBody RoleEntityDTO RoleDTO) {
	        RoleEntityDTO createdRole = roleEntityService.create(RoleDTO);
	        return ResponseEntity.ok(createdRole);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<RoleEntityDTO> updateRole(@PathVariable Long id, @RequestBody RoleEntityDTO RoleDTO) {
	        RoleEntityDTO updatedRole = roleEntityService.update(id, RoleDTO);
	        return ResponseEntity.ok(updatedRole);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
	        roleEntityService.delete(id);
	        return ResponseEntity.noContent().build();
	    }
}
