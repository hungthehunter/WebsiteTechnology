package com.example.NVIDIA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.example.NVIDIA.model.Order;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface OrderRepository extends JpaRepository<Order,Long>{

	@Query("SELECT o FROM Order o WHERE o.recipientName = :recipientName")
	List<Order> findAllByRecipientName(String recipientName);

}
