package com.example.NVIDIA.service.impl;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.dto.OrderDTO;
import com.example.NVIDIA.mapper.OrderDTOMapper;
import com.example.NVIDIA.model.Order;
import com.example.NVIDIA.repository.OrderRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService{

	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderDTOMapper orderDTOMapper;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Order getById(Long id) {
		return orderRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found Order"));

	}

	@Override
	public List<Order> getAll() {
		return orderRepository.findAll();
	}

	@Override
	public OrderDTO create(OrderDTO orderDTO) {
		Order order=new Order();
//		order.setCustomer(userRepository.findById(orderDTO.getCustomer().getId()).orElseThrow(()->new RuntimeException("Cannot found Customer")));
		order.setDelivery_date(orderDTO.getDelivery_date());
		order.setDeliveryAddress(orderDTO.getDeliveryAddress());
		order.setNote(orderDTO.getNote());
		order.setOrder_date(orderDTO.getOrder_date());
		order.setOrder_status(orderDTO.getOrder_status());
		order.setReceipt_date(orderDTO.getReceipt_date());
		order.setRecipientName(orderDTO.getRecipientName());
		order.setRecipientPhone(orderDTO.getRecipientPhone());
		Order saveOrder=orderRepository.save(order);
		return orderDTOMapper.apply(saveOrder);
	}

	@Override
	public OrderDTO update(Long id, OrderDTO orderDTO) {
		Order order=orderRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found order"));
//		order.setCustomer(userRepository.findById(orderDTO.getCustomer().getId()).orElseThrow(()->new RuntimeException("Cannot found Customer")));
		order.setDelivery_date(orderDTO.getDelivery_date());
		order.setDeliveryAddress(orderDTO.getDeliveryAddress());
		order.setNote(orderDTO.getNote());
		order.setOrder_date(orderDTO.getOrder_date());
		order.setOrder_status(orderDTO.getOrder_status());
		order.setReceipt_date(orderDTO.getReceipt_date());
		order.setRecipientName(orderDTO.getRecipientName());
		order.setRecipientPhone(orderDTO.getRecipientPhone());
		Order updateOrder=orderRepository.save(order);
		return orderDTOMapper.apply(updateOrder);
	}
	
	@Override
	public OrderDTO updateStatus(Long id, OrderDTO orderDTO) {
	    Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Cannot found order"));
	    order.setOrder_status(orderDTO.getOrder_status());
	    Order updatedOrder = orderRepository.save(order);
	    return orderDTOMapper.apply(updatedOrder);
	}


	@Override
	public void delete(Long id) {
		orderRepository.deleteById(id);
		
	}


	

	

}
