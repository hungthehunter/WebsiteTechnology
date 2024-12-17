package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.NVIDIA.dto.AddressDTO;
import com.example.NVIDIA.model.Address;
import com.example.NVIDIA.service.AddressService;

@RestController
@RequestMapping("/api/addresses")
public class AddressController{

    @Autowired
    private AddressService AddressService;

    @GetMapping("/{id}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long id) {
        AddressDTO AddressDTO = AddressService.getById(id);
        return ResponseEntity.ok(AddressDTO);
    }

    @GetMapping
    public ResponseEntity<List<AddressDTO>> getAllCategories() {
        List<AddressDTO> categories = AddressService.getAll();
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody Address AddressDTO) {
        Address createdAddress = AddressService.create(AddressDTO);
        return ResponseEntity.ok(createdAddress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address AddressDTO) {
        Address updatedAddress = AddressService.update(id, AddressDTO);
        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        AddressService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
