package com.example.NVIDIA.service.impl;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.BasicAddressDTO;
import com.example.NVIDIA.dto.UserDTO;
import com.example.NVIDIA.mapper.UserDTOMapper;
import com.example.NVIDIA.model.Address;
import com.example.NVIDIA.model.User;
import com.example.NVIDIA.repository.AddressRepository;
import com.example.NVIDIA.repository.DecentralizationRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserDTOMapper userDTOMapper;
	
	@Autowired
	private  PasswordEncoder passwordEncoder;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private DecentralizationRepository decentralizationRepository;
	@Override
	public UserDTO getById(Long id) {
		User user= userRepository.findByIdAndStatusTrue(id).orElseThrow(()->new RuntimeException("Cannot found user"));
		 return userDTOMapper.apply(user);
	}

	@Override
	public List<UserDTO> getAll() {
		 List<User> user= userRepository.findAllByStatusTrue();
		 return user.stream().map(userDTOMapper).collect(Collectors.toList());
	
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
	public User create(User usersDTO) {
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
	        address.setStatus(true);
	        address.setUser(user);
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
	    user.setStatus(true);
	    user.setSalary(usersDTO.getSalary());
	    user.setRole(usersDTO.getRole());
	    user.setDecentralization(decentralizationRepository.findById(usersDTO.getDecentralization().getId()).orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng")));

	    // Save the updated user entity to the database
	    userRepository.save(user);

	    // Save the new addresses associated with the user
	    addressRepository.saveAll(newAddresses);

	    // Return the updated user as a DTO using the mapper
	    return user;
	}

	@Override
	public UserDTO update(Long id, UserDTO usersDTO) {
	    // Tìm người dùng theo ID, nếu không tìm thấy thì ném ngoại lệ
	    User user = userRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
	    
	    // Lấy danh sách địa chỉ cũ
	    List<Address> existingAddresses = user.getAddresses();

	    // Nếu có danh sách địa chỉ mới từ client gửi lên
	    if (usersDTO.getAddresses() != null) {
	        List<Address> updatedAddresses = usersDTO.getAddresses().stream().map(addressDTO -> {
	            // Kiểm tra xem địa chỉ đã tồn tại hay chưa
	            return existingAddresses.stream()
	                    .filter(existingAddress -> 
	                        existingAddress.getHouseNumber().equals(addressDTO.getHouseNumber()) &&
	                        existingAddress.getStreet().equals(addressDTO.getStreet()) &&
	                        existingAddress.getWard().equals(addressDTO.getWard()) &&
	                        existingAddress.getDistrict().equals(addressDTO.getDistrict()) &&
	                        existingAddress.getCity().equals(addressDTO.getCity()) &&
	                        existingAddress.getCountry().equals(addressDTO.getCountry())
	                    )
	                    .findFirst()
	                    .map(existingAddress -> {
	                        // Địa chỉ cũ đã tồn tại, cập nhật trạng thái
	                        existingAddress.setStatus(true);
	                        return existingAddress;
	                    })
	                    .orElseGet(() -> {
	                        // Địa chỉ mới, thêm mới vào danh sách
	                        Address newAddress = new Address();
	                        newAddress.setHouseNumber(addressDTO.getHouseNumber());
	                        newAddress.setStreet(addressDTO.getStreet());
	                        newAddress.setWard(addressDTO.getWard());
	                        newAddress.setDistrict(addressDTO.getDistrict());
	                        newAddress.setCity(addressDTO.getCity());
	                        newAddress.setCountry(addressDTO.getCountry());
	                        newAddress.setStatus(true);
	                        newAddress.setUser(user);
	                        return newAddress;
	                    });
	        }).collect(Collectors.toList());

	        // Đặt status = false cho những địa chỉ không còn trong danh sách mới
	        existingAddresses.stream()
	                .filter(existingAddress -> !updatedAddresses.contains(existingAddress))
	                .forEach(address -> address.setStatus(false));

	        // Cập nhật danh sách địa chỉ cho người dùng
	        user.setAddresses(updatedAddresses);
	    } else {
	        // Nếu danh sách địa chỉ từ client null, đặt tất cả địa chỉ cũ thành status = false
	        existingAddresses.forEach(address -> address.setStatus(false));
	    }

	    // Cập nhật các thông tin khác của người dùng
	    if (usersDTO.getEmail() != null) {
	        user.setEmail(usersDTO.getEmail());
	    }
	    if (usersDTO.getFullname() != null) {
	        user.setFullname(usersDTO.getFullname());
	    }
	    if (usersDTO.getMobile() != null) {
	        user.setMobile(usersDTO.getMobile());
	    }
	    if (usersDTO.getDateofbirth() != null) {
	        user.setDateofbirth(usersDTO.getDateofbirth());
	    }
	    if (usersDTO.getSalary() != null) {
	        user.setSalary(usersDTO.getSalary());
	    }
	    if (usersDTO.getRole() != null) {
	        user.setRole(usersDTO.getRole());
	    }
	    if (usersDTO.getDecentralization() != null) {
	        user.setDecentralization(usersDTO.getDecentralization());
	    }
	    if (usersDTO.getPassword() != null && !usersDTO.getPassword().isEmpty()) {
	        user.setPassword(passwordEncoder.encode(usersDTO.getPassword()));
	    }

	    // Đặt status của user là true khi cập nhật
	    user.setStatus(true);

	    // Lưu người dùng sau khi cập nhật
	    userRepository.save(user);

	    // Trả về DTO sau khi cập nhật
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
//	    List<Address> addresses = user.getAddresses();
//	    if (addresses != null) {
//	        addressRepository.deleteAll(addresses);
//	    }

	    user.setStatus(false);
	    userRepository.save(user);
	}


	@Override
	public UserDTO addAddress(Long id, UserDTO userDTO) {
	    User user = userRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Cannot find user"));

	    List<BasicAddressDTO> addressDTOs = userDTO.getAddresses() != null ? userDTO.getAddresses() : new ArrayList<>();

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
