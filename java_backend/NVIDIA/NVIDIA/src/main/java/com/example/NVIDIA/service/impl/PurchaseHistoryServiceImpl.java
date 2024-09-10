package com.example.NVIDIA.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.dto.PurchaseHistoryDTO;
import com.example.NVIDIA.mapper.PurchaseHistoryDTOMapper;
import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.model.Order;
import com.example.NVIDIA.model.PurchaseHistory;
import com.example.NVIDIA.repository.CartRepository;
import com.example.NVIDIA.repository.OrderRepository;
import com.example.NVIDIA.repository.PurchaseHistoryRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.PurchaseHistoryService;

@Service
public class PurchaseHistoryServiceImpl implements PurchaseHistoryService{

	@Autowired
	private PurchaseHistoryRepository purchaseHistoryRepository;
	
	@Autowired
	private PurchaseHistoryDTOMapper purchaseHistoryDTOMapper;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Override
	public PurchaseHistory getById(Long id) {
		return purchaseHistoryRepository.findById(id).orElseThrow(()-> new RuntimeException("Cannot find Purchase history by id"));
		
	}

	@Override
	public List<PurchaseHistory> getALL() {
		return purchaseHistoryRepository.findAll();
	}

	@Override
	   public PurchaseHistoryDTO create(PurchaseHistoryDTO purchaseHistoryDTO) {
        try {
            PurchaseHistory purchaseHistory = new PurchaseHistory();

            // Map purchaseDate and user
            purchaseHistory.setPurchaseDate(purchaseHistoryDTO.getPurchaseDate());
            purchaseHistory.setUser(userRepository.findById(purchaseHistoryDTO.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found")));
            
            // Map orders
            Order saveOrders=orderRepository.save(purchaseHistoryDTO.getOrders());
            purchaseHistory.setOrders(saveOrders);
            

            // Map carts
            List<Cart> carts = purchaseHistoryDTO.getCarts().stream()
                    .map(itemDTO -> cartRepository.findById(itemDTO.getId())
                            .orElseThrow(() -> new RuntimeException("Cart not found: " + itemDTO.getId())))
                    .collect(Collectors.toList());

            purchaseHistory.setCarts(carts);

            // Save and return mapped PurchaseHistory entity
            PurchaseHistory savedPurchaseHistory = purchaseHistoryRepository.save(purchaseHistory);
            return purchaseHistoryDTOMapper.apply(savedPurchaseHistory);
        } catch (Exception e) {
            // Log the error and re-throw with a more specific message
            throw new RuntimeException("Failed to create purchase history: " + e.getMessage(), e);
        }
    }

	@Override
	public PurchaseHistoryDTO update(Long id, PurchaseHistoryDTO purchaseHistoryDTO) {
		PurchaseHistory purchaseHistory=purchaseHistoryRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found purchase history"));
		  List<Cart> carts = purchaseHistoryDTO.getCarts().stream()
		            .map(itemDTO -> cartRepository.findById(itemDTO.getId())
		                    .orElseThrow(() -> new RuntimeException("Product not found")))
		            .collect(Collectors.toList());
		purchaseHistory.setCarts(carts);
		purchaseHistory.setPurchaseDate(purchaseHistoryDTO.getPurchaseDate());
		purchaseHistory.setUser(userRepository.findById(purchaseHistoryDTO.getUser().getId()).orElseThrow(()->new RuntimeException("Cannot found User")));
	    Order saveOrders=orderRepository.save(purchaseHistoryDTO.getOrders());
        purchaseHistory.setOrders(saveOrders);
		PurchaseHistory updatePurchaseHistory=purchaseHistoryRepository.save(purchaseHistory);
		return purchaseHistoryDTOMapper.apply(updatePurchaseHistory);
	}

	@Override
	public void delete(Long id) {
		purchaseHistoryRepository.deleteById(id);
		
	}

	@Override
	public List<PurchaseHistory> findPurchaseHistoriesByUserId(Long userId) {
	
		return purchaseHistoryRepository.findAllByUserId(userId);
	}
	

}
