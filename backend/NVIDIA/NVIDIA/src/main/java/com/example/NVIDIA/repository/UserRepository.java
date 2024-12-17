package com.example.NVIDIA.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.NVIDIA.model.Role;
import com.example.NVIDIA.model.User;

@Repository

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
	User findByRole(Role role);
	
	@Query(value="SELECT * from USERS U WHERE U.role='User' AND U.status = true",nativeQuery = true)
	List<User> findAllCustomers();
	
	@Query(value="SELECT * from USERS U WHERE U.role='Employee' AND U.status = true",nativeQuery = true)
	List<User> findAllEmployees();
	
    @Query(value = "SELECT * FROM USERS U WHERE U.status = true AND U.role != 'Admin'", nativeQuery = true)
    List<User> findAllByStatusTrue();

    @Query(value = "SELECT * FROM USERS U WHERE U.id = :id AND U.status = true And U.role != 'Admin'", nativeQuery = true)
    Optional<User> findByIdAndStatusTrue(@Param("id") Long id);
	
}
