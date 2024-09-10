package com.example.NVIDIA.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.OrderDetailDTO;
import com.example.NVIDIA.mapper.OrderDetailDTOMapper;
import com.example.NVIDIA.model.OrderDetail;
import com.example.NVIDIA.repository.OrderDetailRepository;
import com.example.NVIDIA.repository.OrderRepository;
import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.service.OrderDetailService;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{

	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	@Autowired
	private OrderDetailDTOMapper orderDetailDTOMapper;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public OrderDetail getById(Long id) {
		return orderDetailRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found OrderDetail"));
	
	}

	@Override
	public List<OrderDetail> getAll() {
		
		return orderDetailRepository.findAll();
	}

	@Override
	public OrderDetailDTO create(OrderDetailDTO orderDetailDTO) {
		OrderDetail orderDetail=new OrderDetail();
		orderDetail.setOrder(orderRepository.findById(orderDetailDTO.getOrder().getId()).orElseThrow(()->new RuntimeException("Cannot found order")));
		orderDetail.setProduct(productRepository.findById(orderDetailDTO.getProduct().getId()).orElseThrow(()->new RuntimeException("Cannot found product")));
		orderDetail.setQuantity(orderDetailDTO.getQuantity());
		orderDetail.setUnitPrice(orderDetailDTO.getUnitPrice());
		OrderDetail saveOrderDetail=orderDetailRepository.save(orderDetail);
		return orderDetailDTOMapper.apply(saveOrderDetail);
	}

	@Override
	public OrderDetailDTO update(Long id, OrderDetailDTO orderDetailDTO) {
		OrderDetail orderDetail=orderDetailRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found orderDetail"));
		orderDetail.setOrder(orderRepository.findById(orderDetailDTO.getOrder().getId()).orElseThrow(()->new RuntimeException("Cannot found order")));
		orderDetail.setProduct(productRepository.findById(orderDetailDTO.getProduct().getId()).orElseThrow(()->new RuntimeException("Cannot found product")));
		orderDetail.setQuantity(orderDetailDTO.getQuantity());
		orderDetail.setUnitPrice(orderDetailDTO.getUnitPrice());
		OrderDetail updateOrderDetail=orderDetailRepository.save(orderDetail);
		return orderDetailDTOMapper.apply(updateOrderDetail);
	}

	@Override
	public void delete(Long id) {
		orderRepository.deleteById(id);
		
	}

}
