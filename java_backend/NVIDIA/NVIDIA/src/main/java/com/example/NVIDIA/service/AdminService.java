package com.example.NVIDIA.service;

import java.util.List;

import com.example.NVIDIA.dto.UserDTO;
import com.example.NVIDIA.model.User;



public interface AdminService {
	User getById(Long id);
	List<User> getAll();
	List<User> getAllEmployees();
	List<User> getAllCustomers();
	UserDTO create (UserDTO usersDTO);
	UserDTO update(Long id , UserDTO usersDTO);
	void delete(Long id);
	UserDTO addAddress(Long id,UserDTO usersDTO);
	UserDTO findUserRole(String email);
	UserDTO updateInfo(Long id, UserDTO usersDTO);
}
