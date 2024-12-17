package com.example.NVIDIA.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import com.example.NVIDIA.model.Order;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface OrderRepository extends JpaRepository<Order,Long>{

    @Query("SELECT o FROM Order o WHERE o.status = true")
    List<Order> findAllByStatusTrue();

    @Query("SELECT o FROM Order o WHERE o.id = :id AND o.status = true")
    Optional<Order> findByIdStatusTrue(@Param("id") Long id);
    
}
