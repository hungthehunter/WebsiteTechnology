package com.example.NVIDIA.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.dto.CartDTO;
import com.example.NVIDIA.dto.OrderDTO;
import com.example.NVIDIA.mapper.OrderDTOMapper;
import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.model.CreditCardPayment;
import com.example.NVIDIA.model.Order;
import com.example.NVIDIA.model.OrderItem;
import com.example.NVIDIA.model.Payment;
import com.example.NVIDIA.model.PaymentMethod;
import com.example.NVIDIA.model.ProcessingStates;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.model.Specification;
import com.example.NVIDIA.repository.AddressRepository;
import com.example.NVIDIA.repository.OrderItemRepository;
import com.example.NVIDIA.repository.OrderRepository;
import com.example.NVIDIA.repository.PaymentRepository;
import com.example.NVIDIA.repository.ProductRepository;
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
	
	@Autowired
	private PaymentRepository paymentRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Override
	public OrderDTO getById(Long id) {
		Order order= orderRepository.findByIdStatusTrue(id).orElseThrow(()->new RuntimeException("Cannot found Order"));
		return orderDTOMapper.apply(order);

	}

	@Override
	public List<OrderDTO> getAll() {
		List<Order> order=orderRepository.findAllByStatusTrue();
		 return order.stream()
			        .map(orderDTOMapper)
			        .collect(Collectors.toList());
	}

	@Override
	public Order create(Order orderDTO, List<Cart> cartItems) {
	    // Step 1: Create Payment
	    Payment payment = new Payment();
	    payment.setPayment_date(new Date(System.currentTimeMillis())); 
	    payment.setTotal_price(orderDTO.getTotal_price());
	    payment.setPayment_status("Completed"); 
	    payment.setPayment_method(orderDTO.getPayment().getPayment_method());
	    payment.setUser(userRepository.findById(orderDTO.getUser().getId())
	                  .orElseThrow(() -> new RuntimeException("Cannot find user")));

	    // Check payment method
	    if (orderDTO.getPayment().getPayment_method() == PaymentMethod.CREDIT_CARD) {
	        CreditCardPayment creditCardPayment = new CreditCardPayment();
	        creditCardPayment.setCardNumber(orderDTO.getPayment().getCreditCardPayment().getCardNumber());
	        creditCardPayment.setCardHolderName(orderDTO.getPayment().getCreditCardPayment().getCardHolderName());
	        creditCardPayment.setCardExpiryDate(orderDTO.getPayment().getCreditCardPayment().getCardExpiryDate());
	        creditCardPayment.setCvv(orderDTO.getPayment().getCreditCardPayment().getCvv());
	        creditCardPayment.setPayment(payment);
	        payment.setCreditCardPayment(creditCardPayment);
	    } else {
	        payment.setCreditCardPayment(null);
	    }

	    // Save Payment first
	    Payment savedPayment = paymentRepository.save(payment);

	    // Step 2: Create Order
	    Order order = new Order();
	    order.setOrder_date(new Date(System.currentTimeMillis())); 
	    order.setTotal_price(orderDTO.getTotal_price());
	    order.setStatus(true);
	    order.setAddress(addressRepository.findById(orderDTO.getAddress().getId())
	                  .orElseThrow(() -> new RuntimeException("Cannot find address")));
	    order.setNote(orderDTO.getNote());
	    order.setOrder_status(orderDTO.getOrder_status()); 
	    order.setPayment(savedPayment);
	    order.setUser(userRepository.findById(orderDTO.getUser().getId())
	                  .orElseThrow(() -> new RuntimeException("Cannot find user")));

	    // Step 3: Create OrderItem from Cart and update Product stock
	    List<OrderItem> orderItems = new ArrayList<>();
	    for (Cart cart : cartItems) {
	        Product product = productRepository.findById(cart.getProduct().getId())
	                           .orElseThrow(() -> new RuntimeException("Cannot find product"));

	        // Decrease product stock
	        if (product.getUnitInStock() < cart.getQuantity()) {
	            throw new RuntimeException("Insufficient stock for product: " + product.getProductName());
	        }
	        product.setUnitInStock(product.getUnitInStock() - cart.getQuantity());
	        product.setUnitInOrder(product.getUnitInOrder() + cart.getQuantity());
	        productRepository.save(product); // Save updated stock

	        // Create OrderItem
	        OrderItem orderItem = new OrderItem();
	        orderItem.setQuanitty(cart.getQuantity()); 
	        orderItem.setTotalPrice(cart.getTotalPrice());
	        orderItem.setProduct(product);
	        orderItem.setOrder(order);
	        orderItems.add(orderItem);
	    }
	    order.setOrderItem(orderItems);

	    // Save Order
	    Order savedOrder = orderRepository.save(order);

	    return savedOrder;
	}

	
	@Override
	public Order update(Long id, Order orderDTO) {
	    // Find the existing Order by id
	    Order existingOrder = orderRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Cannot find order"));

	    // Check and handle order_status transitions
	    if (orderDTO.getOrder_status() != null) {
	        ProcessingStates currentStatus = existingOrder.getOrder_status();
	        ProcessingStates newStatus = orderDTO.getOrder_status();
	        
	        if (currentStatus == ProcessingStates.Pending && newStatus == ProcessingStates.Canceled) {
	            // Restore stock for canceled items
	            for (OrderItem existingOrderItem : existingOrder.getOrderItem()) {
	                Product product = existingOrderItem.getProduct();
	                product.setUnitInStock(product.getUnitInStock() + existingOrderItem.getQuanitty());
	                product.setUnitInOrder(product.getUnitInOrder() - existingOrderItem.getQuanitty());
	                productRepository.save(product);
	            }
	        } else if (currentStatus == ProcessingStates.Canceled && newStatus == ProcessingStates.Pending) {
	            // Adjust stock for reactivated order
	            for (OrderItem existingOrderItem : existingOrder.getOrderItem()) {
	                Product product = existingOrderItem.getProduct();
	                if (product.getUnitInStock() < existingOrderItem.getQuanitty()) {
	                    throw new RuntimeException("Insufficient stock for product: " + product.getProductName());
	                }
	                product.setUnitInStock(product.getUnitInStock() - existingOrderItem.getQuanitty());
	                product.setUnitInOrder(product.getUnitInOrder() + existingOrderItem.getQuanitty());
	                productRepository.save(product);
	            }
	        }else if ((currentStatus == ProcessingStates.Pending || currentStatus == ProcessingStates.InProgress)
	                && newStatus == ProcessingStates.Canceled) {
	            // Restore stock for all OrderItems
	            for (OrderItem item : existingOrder.getOrderItem()) {
	                Product product = item.getProduct();
	                product.setUnitInStock(product.getUnitInStock() + item.getQuanitty());
	                product.setUnitInOrder(product.getUnitInOrder() - item.getQuanitty());
	                productRepository.save(product);
	            }
	        } else if (currentStatus == ProcessingStates.Canceled && newStatus == ProcessingStates.Pending) {
	            // Deduct stock for all OrderItems
	            for (OrderItem item : existingOrder.getOrderItem()) {
	                Product product = item.getProduct();
	                if (product.getUnitInStock() < item.getQuanitty()) {
	                    throw new RuntimeException("Insufficient stock for product: " + product.getProductName());
	                }
	                product.setUnitInStock(product.getUnitInStock() - item.getQuanitty());
	                product.setUnitInOrder(product.getUnitInOrder() + item.getQuanitty());
	                productRepository.save(product);
	            }
	        } else if (currentStatus == ProcessingStates.Completed) {
	            // No action needed for completed orders
	            if (newStatus != ProcessingStates.Completed) {
	                throw new RuntimeException("Cannot change status of a completed order.");
	            }
	        }

	        // Update the order status
	        existingOrder.setOrder_status(newStatus);
	    }

	    // Update other fields if provided in the DTO
	    if (orderDTO.getOrder_date() != null) {
	        existingOrder.setOrder_date(orderDTO.getOrder_date());
	    }
	    if (orderDTO.getTotal_price() != null) {
	        existingOrder.setTotal_price(orderDTO.getTotal_price());
	    }
	    existingOrder.setStatus(true); // Always keep status true when updating

	    if (orderDTO.getAddress() != null && orderDTO.getAddress().getId() != null) {
	        existingOrder.setAddress(
	            addressRepository.findById(orderDTO.getAddress().getId())
	                .orElseThrow(() -> new RuntimeException("Cannot find address"))
	        );
	    }
	    if (orderDTO.getNote() != null) {
	        existingOrder.setNote(orderDTO.getNote());
	    }

	    // Update OrderItems (logic stays unchanged from your original implementation)
	    if (orderDTO.getOrderItem() != null && !orderDTO.getOrderItem().isEmpty()) {
	        for (OrderItem existingOrderItem : existingOrder.getOrderItem()) {
	            Product product = existingOrderItem.getProduct();
	            product.setUnitInStock(product.getUnitInStock() + existingOrderItem.getQuanitty());
	            product.setUnitInOrder(product.getUnitInOrder() - existingOrderItem.getQuanitty());
	            productRepository.save(product);
	        }
	        existingOrder.getOrderItem().clear();

	        List<OrderItem> updatedOrderItems = new ArrayList<>();
	        for (OrderItem orderItemDTO : orderDTO.getOrderItem()) {
	            Product product = productRepository.findById(orderItemDTO.getProduct().getId())
	                .orElseThrow(() -> new RuntimeException("Cannot find product"));
	            if (product.getUnitInStock() < orderItemDTO.getQuanitty()) {
	                throw new RuntimeException("Insufficient stock for product: " + product.getProductName());
	            }
	            product.setUnitInStock(product.getUnitInStock() - orderItemDTO.getQuanitty());
	            product.setUnitInOrder(product.getUnitInOrder() + orderItemDTO.getQuanitty());
	            productRepository.save(product);

	            OrderItem orderItem = new OrderItem();
	            orderItem.setQuanitty(orderItemDTO.getQuanitty());
	            orderItem.setTotalPrice(orderItemDTO.getTotalPrice());
	            orderItem.setProduct(product);
	            orderItem.setOrder(existingOrder);
	            updatedOrderItems.add(orderItem);
	        }
	        existingOrder.setOrderItem(updatedOrderItems);
	    }

	    // Save updated Order
	    return orderRepository.save(existingOrder);
	}


//	Từ Pending sang Canceled:
//
//		Nếu trạng thái hiện tại là Pending và bạn chuyển sang Canceled, sản phẩm sẽ được khôi phục vào kho (tăng UnitInStock và giảm UnitInOrder).
//		Các sản phẩm trong đơn hàng này sẽ được trả lại vào kho, không tính vào số lượng đặt hàng (đơn hàng không còn được tính là "đã đặt").
//		Từ Canceled sang Pending:
//
//		Nếu trạng thái hiện tại là Canceled và bạn chuyển sang Pending, sản phẩm sẽ bị giảm khỏi kho (giảm UnitInStock và tăng UnitInOrder).
//		Điều này sẽ thực hiện việc tái kích hoạt đơn hàng, và đảm bảo rằng có đủ kho để chứa các sản phẩm đã được đặt lại. Nếu không đủ kho, hệ thống sẽ báo lỗi.
//		Từ Pending sang InProgress hoặc ngược lại (giữa Pending và InProgress):
//
//		Không có thay đổi nào đối với kho khi trạng thái chuyển từ Pending sang InProgress hoặc từ InProgress sang Pending.
//		Đây là một chuyển đổi trạng thái đơn thuần, không ảnh hưởng đến số lượng sản phẩm trong kho hay đơn hàng.
//		Từ InProgress sang Canceled:
//
//		Nếu trạng thái chuyển từ InProgress sang Canceled, sản phẩm sẽ được khôi phục vào kho (tăng UnitInStock và giảm UnitInOrder).
//		Đơn hàng sẽ bị hủy và số lượng sản phẩm sẽ được trả lại kho.
//		Từ Canceled sang InProgress:
//
//		Nếu trạng thái chuyển từ Canceled sang InProgress, sản phẩm sẽ bị giảm khỏi kho (giảm UnitInStock và tăng UnitInOrder).
//		Đơn hàng sẽ được tiếp tục xử lý và số lượng sẽ được tính vào đơn hàng đang "chờ giao".
//		Từ Completed sang bất kỳ trạng thái khác:
//
//		Không thể thay đổi trạng thái của đơn hàng khi nó đã hoàn thành (Completed).
//		Nếu cố gắng thay đổi trạng thái của đơn hàng đã hoàn thành, hệ thống sẽ trả về lỗi: "Cannot change status of a completed order."



	@Override
	public void delete(Long id) {
		Optional<Order> optionalOrder = orderRepository.findById(id);
		
		  if (!optionalOrder.isPresent()) {
		        throw new RuntimeException("Product not found with id: " + id);
		    }
		    Order order = optionalOrder.get();
		 
		order.setStatus(false);
		orderRepository.save(order);
	}

	@Override
	public Order updateStatus(Long id, Order orderDTO) {
		Order order = orderRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found Order"));
		order.setOrder_status(orderDTO.getOrder_status());
		orderRepository.save(order);
		return order;
	}


	

	

}
