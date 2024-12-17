package com.example.NVIDIA.service;
import java.util.List;
import com.example.NVIDIA.dto.CartDTO;
import com.example.NVIDIA.dto.OrderDTO;
import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.model.Order;

public interface OrderService {
	OrderDTO getById(Long id);
	List<OrderDTO> getAll();
	Order create(Order orderDTO,  List<Cart> cartItems);
	Order update(Long id,Order orderDTO);
	Order updateStatus(Long id, Order orderDTO  );
	void delete(Long id);
}
