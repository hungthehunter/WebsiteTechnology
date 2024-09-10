package com.example.NVIDIA.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import com.example.NVIDIA.model.PurchaseHistory;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory,Long> {

	 @Query("SELECT p FROM PurchaseHistory p WHERE p.user.id = :userId")
	 List<PurchaseHistory> findAllByUserId(Long userId);

}
