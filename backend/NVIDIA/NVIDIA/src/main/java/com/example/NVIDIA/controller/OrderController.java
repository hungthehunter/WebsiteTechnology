package com.example.NVIDIA.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.NVIDIA.dto.CartDTO;
import com.example.NVIDIA.dto.OrderDTO;
import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.model.Order;
import com.example.NVIDIA.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        OrderDTO orderDTO = orderService.getById(id);
        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> orders = orderService.getAll();
        return ResponseEntity.ok(orders);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Order> createOrder(@RequestPart("order") Order orderDTO ,@RequestPart("cart") List<Cart> cartDTO) {
        Order createdOrder = orderService.create(orderDTO,cartDTO);
        return ResponseEntity.ok(createdOrder);
    }

   
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestPart("order") Order orderDTO ) {
        Order updatedOrder = orderService.update(id, orderDTO);
        return ResponseEntity.ok(updatedOrder);
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
