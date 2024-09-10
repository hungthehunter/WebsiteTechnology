package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.NVIDIA.dto.AddressDTO;
import com.example.NVIDIA.model.Address;
import com.example.NVIDIA.service.AddressService;

@RestController
@RequestMapping("/api/address")
public class AddressController{

    @Autowired
    private AddressService AddressService;

    @GetMapping("/{id}")
    public ResponseEntity<Address> getAddressById(@PathVariable Long id) {
        Address AddressDTO = AddressService.getById(id);
        return ResponseEntity.ok(AddressDTO);
    }

    @GetMapping
    public ResponseEntity<List<Address>> getAllCategories() {
        List<Address> categories = AddressService.getAll();
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<AddressDTO> createAddress(@RequestBody AddressDTO AddressDTO) {
        AddressDTO createdAddress = AddressService.create(AddressDTO);
        return ResponseEntity.ok(createdAddress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable Long id, @RequestBody AddressDTO AddressDTO) {
        AddressDTO updatedAddress = AddressService.update(id, AddressDTO);
        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        AddressService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
