package com.example.NVIDIA.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


import com.example.NVIDIA.model.CartItem;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface CartItemRepository extends JpaRepository<CartItem, Long>{
	Optional<CartItem> findByCartId(Long cartId);
}
