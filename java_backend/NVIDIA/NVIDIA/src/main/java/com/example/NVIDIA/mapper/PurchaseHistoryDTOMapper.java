package com.example.NVIDIA.mapper;

import java.util.function.Function;
import java.util.stream.Collectors;

import com.example.NVIDIA.dto.PurchaseHistoryDTO;
import com.example.NVIDIA.model.PurchaseHistory;
import org.springframework.stereotype.Component;
@Component
public class PurchaseHistoryDTOMapper implements Function<PurchaseHistory,PurchaseHistoryDTO>{

	@Override
	public PurchaseHistoryDTO apply(PurchaseHistory purchaseHistory) {
	
			return new PurchaseHistoryDTO(
			
					purchaseHistory.getPurchaseDate(),
					purchaseHistory.getUser(),
					purchaseHistory.getCarts().stream().collect(Collectors.toList()),
					purchaseHistory.getOrders()
					);
	}

}
