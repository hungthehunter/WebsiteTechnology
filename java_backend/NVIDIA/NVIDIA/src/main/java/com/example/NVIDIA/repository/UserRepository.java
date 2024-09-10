package com.example.NVIDIA.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.Role;
import com.example.NVIDIA.model.User;

@Repository

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
	User findByRole(Role role);
	
	@Query(value="SELECT * from USERS U WHERE U.role='User'",nativeQuery = true)
	List<User> findAllCustomers();
	
	@Query(value="SELECT * from USERS U WHERE U.role='Employee'",nativeQuery = true)
	List<User> findAllEmployees();
}
