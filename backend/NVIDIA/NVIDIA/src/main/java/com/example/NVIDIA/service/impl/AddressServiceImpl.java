package com.example.NVIDIA.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.dto.AddressDTO;
import com.example.NVIDIA.mapper.AddressDTOMapper;
import com.example.NVIDIA.model.Address;
import com.example.NVIDIA.model.User;
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
    public AddressDTO getById(Long id) {
        Address address = AddressRepository.findByIdAndStatusTrue(id)
                .orElseThrow(() -> new RuntimeException("Cannot find Address"));
     return AddressDTOMapper.apply(address);
    }

    @Override
    public List<AddressDTO> getAll() {
    	List<Address> address= AddressRepository.findAllByStatusTrue();
    return address.stream().map(AddressDTOMapper).collect(Collectors.toList());
    }

    @Override
    public Address create(Address AddressDTO) {
        Address address = new Address();

        // Copy các thuộc tính của Address
        address.setCity(AddressDTO.getCity());
        address.setCountry(AddressDTO.getCountry());
        address.setDistrict(AddressDTO.getDistrict());
        address.setWard(AddressDTO.getWard());
        address.setHouseNumber(AddressDTO.getHouseNumber());
        address.setStreet(AddressDTO.getStreet());
        address.setStatus(true);

        // Tìm User trong cơ sở dữ liệu
        User user = userRepository.findById(AddressDTO.getUser().getId())
            .orElseThrow(() -> new RuntimeException("User not found with id: " + AddressDTO.getUser().getId()));

        // Gán User đã được quản lý vào Address
        address.setUser(user);

        // Lưu Address
        Address savedAddress = AddressRepository.save(address);
        return savedAddress;
    }


    @Override
    public Address update(Long id, Address AddressDTO) {
        Address Address = AddressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find Address"));
        Address.setCity(AddressDTO.getCity());
        Address.setCountry(AddressDTO.getCountry());
        Address.setDistrict(AddressDTO.getDistrict());
        Address.setWard(AddressDTO.getWard());
        Address.setHouseNumber(AddressDTO.getHouseNumber());
        Address.setStreet(AddressDTO.getStreet());
        Address.setStatus(true);
        Address.setUser(AddressDTO.getUser());
        Address updatedAddress = AddressRepository.save(Address);
        return updatedAddress;
    }

    @Override
    public void delete(Long id) {
    	  Address address = AddressRepository.findByIdAndStatusTrue(id)
                  .orElseThrow(() -> new RuntimeException("Cannot find Address"));
    	  address.setStatus(false);
        AddressRepository.save(address);
    }
}
