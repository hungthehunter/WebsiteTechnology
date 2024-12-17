package com.example.NVIDIA.service.impl;
import com.example.NVIDIA.dto.CartDTO;
import com.example.NVIDIA.mapper.CartDTOMapper;
import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.repository.CartRepository;
import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	 @Autowired
	    private CartDTOMapper cartDTOMapper;
	 
	 @Autowired
	 private ProductRepository productRepository;

	 
	@Override
	public CartDTO getCartById(Long id) {
     Cart cart= cartRepository.findById(id).orElseThrow(()-> new RuntimeException("Cart not found"));
return cartDTOMapper.apply(cart);
	}
	
	@Override
	public List<CartDTO> getAllCarts() {
		List<Cart> cart = cartRepository.findAll();
		return cart.stream().map(cartDTOMapper).collect(Collectors.toList());
	}
	
	public List<CartDTO> getCartByUserId(Long userId) {
	    if (userId == null) {
	        throw new IllegalArgumentException("User ID cannot be null");
	    }

	    // Fetch active carts for the given user ID
	    List<Cart> carts = cartRepository.findAllActiveCartsByUserId(userId);

//	    if (carts.isEmpty()) {
//	        throw new RuntimeException("No active cart items found for the user");
//	    }

	    return carts.stream().map(cartDTOMapper).collect(Collectors.toList());
	}


	@Override
	public Cart createCart(CartDTO cartDTO) {
//	    if (cartDTO.getUser() == null || cartDTO.getUser().getId() == null) {
//	        throw new RuntimeException("User information is missing");
//	    }
//	    if (cartDTO.getProduct() == null || cartDTO.getProduct().getId() == null) {
//	        throw new RuntimeException("Product information is missing");
//	    }

	    // Kiểm tra xem người dùng đã có giỏ hàng với sản phẩm đó chưa
	    List<Cart> existingCarts = cartRepository.findAllActiveCartsByUserId(cartDTO.getUser().getId());
	    Cart existingCart = existingCarts.stream()
	        .filter(cart -> cart.getProduct().getId().equals(cartDTO.getProduct().getId()))
	        .filter(cart -> cart.getStatus() == true) // Kiểm tra trạng thái là true
	        .findFirst()
	        .orElse(null);

	    if (existingCart != null) {
	        // Nếu có giỏ hàng tồn tại với sản phẩm này và status là true, cập nhật số lượng và tổng giá
	        existingCart.setQuantity(existingCart.getQuantity() + cartDTO.getQuantity());
	        existingCart.setTotalPrice(existingCart.getTotalPrice());
	        return cartRepository.save(existingCart); // Lưu cập nhật
	    }

	    Cart cart = new Cart();
	    cart.setQuantity(cartDTO.getQuantity());
	    cart.setStatus(true);
	    cart.setUser(userRepository.findById(cartDTO.getUser().getId())
	        .orElseThrow(() -> new RuntimeException("User not found")));
	    Product product = productRepository.findById(cartDTO.getProduct().getId())
	        .orElseThrow(() -> new RuntimeException("Product not found"));
	    cart.setProduct(product);
	    cart.setTotalPrice(cartDTO.getTotalPrice());
	    cart = cartRepository.save(cart);
	    return cart;
	}





	@Override
	public Cart updateCart(Long id, CartDTO cartDTO) {
	    Cart cart = cartRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Cart not found"));
	        cart.setQuantity(cartDTO.getQuantity());
	        
	        // Kiểm tra số lượng
	        if (cartDTO.getQuantity() < 1) {
	            cart.setStatus(false); // Đặt status thành false nếu số lượng < 1
	        } else {
	            cart.setStatus(true);
	        }
	        
	        cart.setUser(userRepository.findById(cartDTO.getUser().getId())
	            .orElseThrow(() -> new RuntimeException("User not found")));
	        
	        Product product = productRepository.findById(cartDTO.getProduct().getId())
	            .orElseThrow(() -> new RuntimeException("Product not found"));
	        
	        cart.setProduct(product);
	        double totalPrice = product.getUnitPrice() * cartDTO.getQuantity();
	        cart.setTotalPrice(totalPrice);
	        
	        return cartRepository.save(cart);
	}

	@Override
	public void deleteCart(Long id) {
	    Cart cart = cartRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Cart not found"));
	    cart.setStatus(false);
	    cartRepository.save(cart);
	}	
}
