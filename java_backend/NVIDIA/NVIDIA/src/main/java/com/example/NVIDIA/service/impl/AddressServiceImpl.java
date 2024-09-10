package com.example.NVIDIA.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.dto.AddressDTO;
import com.example.NVIDIA.mapper.AddressDTOMapper;
import com.example.NVIDIA.model.Address;
import com.example.NVIDIA.repository.AddressRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository AddressRepository;

    @Autowired
    private AddressDTOMapper AddressDTOMapper;
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public Address getById(Long id) {
        return AddressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find Address"));
     
    }

    @Override
    public List<Address> getAll() {
        return AddressRepository.findAll();
    }

    @Override
    public AddressDTO create(AddressDTO AddressDTO) {
        Address Address = new Address();
      Address.setCity(AddressDTO.getCity());
Address.setCountry(AddressDTO.getCountry());
Address.setDistrict(AddressDTO.getDistrict());
Address.setWard(AddressDTO.getWard());
Address.setHouseNumber(AddressDTO.getHouseNumber());
Address.setStreet(AddressDTO.getStreet());
Address savedAddress = AddressRepository.save(Address);
        return AddressDTOMapper.apply(savedAddress);
    }

    @Override
    public AddressDTO update(Long id, AddressDTO AddressDTO) {
        Address Address = AddressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find Address"));
        Address.setCity(AddressDTO.getCity());
        Address.setCountry(AddressDTO.getCountry());
        Address.setDistrict(AddressDTO.getDistrict());
        Address.setWard(AddressDTO.getWard());
        Address.setHouseNumber(AddressDTO.getHouseNumber());
        Address.setStreet(AddressDTO.getStreet());

        Address updatedAddress = AddressRepository.save(Address);
        return AddressDTOMapper.apply(updatedAddress);
    }

    @Override
    public void delete(Long id) {
        AddressRepository.deleteById(id);
    }
}
