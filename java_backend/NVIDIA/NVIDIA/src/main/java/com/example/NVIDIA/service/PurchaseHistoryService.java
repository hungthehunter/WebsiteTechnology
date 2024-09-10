package com.example.NVIDIA.service;
import java.util.List;
import com.example.NVIDIA.dto.PurchaseHistoryDTO;
import com.example.NVIDIA.model.PurchaseHistory;

public interface PurchaseHistoryService {
	PurchaseHistory getById(Long id);
	List<PurchaseHistory> getALL();
	PurchaseHistoryDTO create(PurchaseHistoryDTO purchaseHistoryDTO);
	PurchaseHistoryDTO update(Long id, PurchaseHistoryDTO purchaseHistoryDTO);
	void delete(Long id);
	List<PurchaseHistory> findPurchaseHistoriesByUserId(Long userId);
}
