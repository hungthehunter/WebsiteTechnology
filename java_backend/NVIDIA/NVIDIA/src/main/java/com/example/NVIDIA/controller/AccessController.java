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

import com.example.NVIDIA.dto.AccessDTO;
import com.example.NVIDIA.model.Access;
import com.example.NVIDIA.service.AccessService;


@RestController
@RequestMapping("/api/accesses")
public class AccessController {
	  @Autowired
	    private AccessService AccessService;

	    @GetMapping("/{id}")
	    public ResponseEntity<Access> getAccessById(@PathVariable Long id) {
	        Access AccessDTO = AccessService.getById(id);
	        return ResponseEntity.ok(AccessDTO);
	    }

	    @GetMapping
	    public ResponseEntity<List<Access>> getAllAccesss() {
	        List<Access> Accesss = AccessService.getAll();
	        return ResponseEntity.ok(Accesss);
	    }

	    @PostMapping
	    public ResponseEntity<AccessDTO> createAccess(@RequestBody AccessDTO AccessDTO) {
	        AccessDTO createdAccess = AccessService.create(AccessDTO);
	        return ResponseEntity.ok(createdAccess);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<AccessDTO> updateAccess(@PathVariable Long id, @RequestBody AccessDTO AccessDTO) {
	        AccessDTO updatedAccess = AccessService.update(id, AccessDTO);
	        return ResponseEntity.ok(updatedAccess);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteAccess(@PathVariable Long id) {
	        AccessService.delete(id);
	        return ResponseEntity.noContent().build();
	    }
}
