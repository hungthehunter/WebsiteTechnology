package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.NVIDIA.dto.OrderDetailDTO;
import com.example.NVIDIA.model.OrderDetail;
import com.example.NVIDIA.service.OrderDetailService;

@RestController
@RequestMapping("/api/orderDetails")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Long id) {
        OrderDetail orderDetailDTO = orderDetailService.getById(id);
        return ResponseEntity.ok(orderDetailDTO);
    }

    @GetMapping
    public ResponseEntity<List<OrderDetail>> getAllOrderDetails() {
        List<OrderDetail> orderDetails = orderDetailService.getAll();
        return ResponseEntity.ok(orderDetails);
    }

    @PostMapping
    public ResponseEntity<OrderDetailDTO> createOrderDetail(@RequestBody OrderDetailDTO orderDetailDTO) {
        OrderDetailDTO createdOrderDetail = orderDetailService.create(orderDetailDTO);
        return ResponseEntity.ok(createdOrderDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDetailDTO> updateOrderDetail(@PathVariable Long id, @RequestBody OrderDetailDTO orderDetailDTO) {
        OrderDetailDTO updatedOrderDetail = orderDetailService.update(id, orderDetailDTO);
        return ResponseEntity.ok(updatedOrderDetail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable Long id) {
        orderDetailService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
