package com.example.NVIDIA.service.impl;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.AddressDTO;
import com.example.NVIDIA.dto.UserDTO;
import com.example.NVIDIA.mapper.UserDTOMapper;
import com.example.NVIDIA.model.Address;
import com.example.NVIDIA.model.Role;
import com.example.NVIDIA.model.User;
import com.example.NVIDIA.repository.AddressRepository;
import com.example.NVIDIA.repository.DecentralizationRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.AddressService;
import com.example.NVIDIA.service.AdminService;

import jakarta.transaction.Transactional;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserDTOMapper userDTOMapper;
	
	@Autowired
	private  PasswordEncoder passwordEncoder;
	
	@Autowired
	private DecentralizationRepository decentralizationRepository;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private AddressService addressService;
	
	@Override
	public User getById(Long id) {
		return userRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found user"));
		
	}

	@Override
	public List<User> getAll() {
		 return userRepository.findAll();
	
	}

	@Override
	public List<User> getAllEmployees() {
		return userRepository.findAllEmployees();
	}

	@Override
	public List<User> getAllCustomers() {
		return userRepository.findAllCustomers();
	}

	@Override
	public UserDTO create(UserDTO usersDTO) {
	    User user = new User();

	    // Convert the list of AddressDTO to a list of Address entities and set the user association
	    List<Address> newAddresses = usersDTO.getAddresses().stream().map(addressDTO -> {
	        Address address = new Address();
	        address.setHouseNumber(addressDTO.getHouseNumber());
	        address.setStreet(addressDTO.getStreet());
	        address.setWard(addressDTO.getWard());
	        address.setDistrict(addressDTO.getDistrict());
	        address.setCity(addressDTO.getCity());
	        address.setCountry(addressDTO.getCountry());
	        return address;
	    }).collect(Collectors.toList());

	    // Set the new addresses on the user entity
	    user.setAddresses(newAddresses);

	    // Update user details (excluding password if it's not provided)
	    user.setEmail(usersDTO.getEmail());
	    user.setFullname(usersDTO.getFullname());
	    user.setMobile(usersDTO.getMobile());

	    // Update the password only if it is provided and not empty
	    if (usersDTO.getPassword() != null && !usersDTO.getPassword().isEmpty()) {
	        user.setPassword(passwordEncoder.encode(usersDTO.getPassword()));
	    }

	    user.setDateofbirth(usersDTO.getDateofbirth());
	    user.setRole(usersDTO.getRole());
	    user.setDecentralization(usersDTO.getDecentralization());

	    // Save the updated user entity to the database
	    userRepository.save(user);

	    // Save the new addresses associated with the user
	    addressRepository.saveAll(newAddresses);

	    // Return the updated user as a DTO using the mapper
	    return userDTOMapper.apply(user);
	}

	@Transactional
	@Override
	public UserDTO update(Long id, UserDTO usersDTO) {
	    // Tìm người dùng theo ID, nếu không tìm thấy thì ném ngoại lệ
	    User user = userRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

	    // Xóa tất cả các địa chỉ hiện có liên kết với người dùng
	    List<Address> existingAddresses = user.getAddresses();
	    addressRepository.deleteAll(existingAddresses);

	    // Chuyển đổi danh sách AddressDTO thành danh sách các thực thể Address và thiết lập liên kết với người dùng
	    List<Address> newAddresses = usersDTO.getAddresses().stream().map(addressDTO -> {
	        Address address = new Address();
	        address.setHouseNumber(addressDTO.getHouseNumber());
	        address.setStreet(addressDTO.getStreet());
	        address.setWard(addressDTO.getWard());
	        address.setDistrict(addressDTO.getDistrict());
	        address.setCity(addressDTO.getCity());
	        address.setCountry(addressDTO.getCountry());
	        return address;
	    }).collect(Collectors.toList());

	    // Đặt các địa chỉ mới vào thực thể người dùng TRƯỚC khi lưu người dùng
	    user.setAddresses(newAddresses);

	    // Cập nhật thông tin người dùng (ngoại trừ mật khẩu nếu không được cung cấp)
	    user.setEmail(usersDTO.getEmail());
	    user.setFullname(usersDTO.getFullname());
	    user.setMobile(usersDTO.getMobile());

	    // Chỉ cập nhật mật khẩu nếu được cung cấp và không trống
	    if (usersDTO.getPassword() != null && !usersDTO.getPassword().isEmpty()) {
	        user.setPassword(passwordEncoder.encode(usersDTO.getPassword()));
	    }

	    user.setDateofbirth(usersDTO.getDateofbirth());
	    user.setRole(usersDTO.getRole());
	    user.setDecentralization(usersDTO.getDecentralization());

	    userRepository.save(user);

	    return userDTOMapper.apply(user);
	}




	
	@Override
	public UserDTO updateInfo(Long id, UserDTO usersDTO) {
		User user=userRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found user"));
		user.setEmail(usersDTO.getEmail());
		user.setFullname(usersDTO.getFullname());
		user.setMobile(usersDTO.getMobile());
		user.setDateofbirth(usersDTO.getDateofbirth());
		   if (usersDTO.getPassword() != null && !usersDTO.getPassword().isEmpty()) {
		        user.setPassword(passwordEncoder.encode(usersDTO.getPassword()));
		    }
		userRepository.save(user);
		return userDTOMapper.apply(user);
	}
	
	@Override
	public void delete(Long id) {
	    // Retrieve the user along with their addresses
	    User user = userRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Cannot find user"));

	    // Delete associated addresses
	    List<Address> addresses = user.getAddresses();
	    if (addresses != null) {
	        addressRepository.deleteAll(addresses);
	    }
	   
	    
	    
	    // Delete the user
	    userRepository.deleteById(id);
	}


	@Override
	public UserDTO addAddress(Long id, UserDTO userDTO) {
	    User user = userRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Cannot find user"));

	    List<AddressDTO> addressDTOs = userDTO.getAddresses() != null ? userDTO.getAddresses() : new ArrayList<>();

	    // Convert DTOs to entities and set the user
	    List<Address> newAddresses = addressDTOs.stream().map(dto -> {
	        Address address = new Address();
	        address.setHouseNumber(dto.getHouseNumber());
	        address.setStreet(dto.getStreet());
	        address.setWard(dto.getWard());
	        address.setDistrict(dto.getDistrict());
	        address.setCity(dto.getCity());
	        address.setCountry(dto.getCountry());
	        return address;
	    }).collect(Collectors.toList());

	    user.getAddresses().clear(); 
	    user.getAddresses().addAll(newAddresses); 
	    userRepository.save(user);

	    return userDTOMapper.apply(user);
	}



	@Override
	public UserDTO findUserRole(String email) {
	
		return null;
	}



	

	

}
