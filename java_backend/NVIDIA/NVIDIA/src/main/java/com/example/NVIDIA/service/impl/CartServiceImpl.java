package com.example.NVIDIA.service.impl;
import com.example.NVIDIA.Util.ImageDataUtil;
import com.example.NVIDIA.dto.CartDTO;
import com.example.NVIDIA.mapper.CartDTOMapper;
import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.model.ImageData;
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
	public Cart getCartById(Long id) {
     return cartRepository.findById(id).orElseThrow(()-> new RuntimeException("Cart not found"));

	}
	
	@Override
	public List<Cart> getAllCarts() {
	   return cartRepository.findAll();
	}

	@Override
	public CartDTO createCart(CartDTO cartDTO) {
	    Cart cart = new Cart();
	    cart.setTotalPrice(cartDTO.getTotalPrice());
	    cart.setTotalQuantity(cartDTO.getTotalQuantity());
	    cart.setStatus(true);
	    cart.setUser(userRepository.findById(cartDTO.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found")));

	    // Xử lý danh sách sản phẩm
	    List<Product> products = cartDTO.getProducts().stream()
	            .map(itemDTO -> productRepository.findById(itemDTO.getId())
	                    .orElseThrow(() -> new RuntimeException("Product not found")))
	            .collect(Collectors.toList());

	    cart.setProducts(products); // Đặt danh sách sản phẩm cho Cart

	    cart = cartRepository.save(cart); // Lưu Cart vào cơ sở dữ liệu

	    return cartDTOMapper.apply(cart);
	}



	@Override
	public CartDTO updateCart(Long id, CartDTO cartDTO) {
		  Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart not found"));
		    cart.setTotalPrice(cartDTO.getTotalPrice());
		      cart.setTotalQuantity(cartDTO.getTotalQuantity());
		      cart.setStatus(true);
		        cart.setUser(userRepository.findById(cartDTO.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found")));
		        // Xử lý danh sách sản phẩm
			    List<Product> products = cartDTO.getProducts().stream()
			            .map(itemDTO -> productRepository.findById(itemDTO.getId())
			                    .orElseThrow(() -> new RuntimeException("Product not found")))
			            .collect(Collectors.toList());

			    cart.setProducts(products); // Đặt danh sách sản phẩm cho Cart
		        cart = cartRepository.save(cart);
	        return cartDTOMapper.apply(cart);
	}

	@Override
	public void deleteCart(Long id) {
		
		List<Cart> listCart=cartRepository.findAllByUserId(id);
		  for (Cart cart : listCart) {
		        cart.setStatus(false);
		    }
		  listCart=cartRepository.saveAll(listCart);
		
	}	
	
	@Override
	public void RemoveCartProduct(Long userId, Long productId) {
	    List<Cart> listCart = cartRepository.findAllByUserId(userId);
	    for (Cart cart : listCart) {
	        List<Product> products = cart.getProducts();
	        products.removeIf(product -> product.getId().equals(productId)); 
	        cart.setProducts(products); 
	    }
	    cartRepository.saveAll(listCart);
	}

	
	public List<Cart> findCartsByUserId(Long userId) {
	    List<Cart> carts = cartRepository.findAllByUserId(userId);

	    return carts.stream().map(cart -> {
	        List<Product> products = cart.getProducts().stream().map(product -> {
	            List<ImageData> decompressedImages = product.getProduct_image().stream()
	                .map(imageData -> {
	                    ImageData dto = new ImageData();
	                    dto.setId(imageData.getId());
	                    dto.setName(imageData.getName());
	                    dto.setType(imageData.getType());
	                    dto.setIsMainImage(imageData.getIsMainImage());
	                    dto.setImageData(ImageDataUtil.decompressImage(imageData.getImageData()));
	                    return dto;
	                })
	                .collect(Collectors.toList());

	            product.setProduct_image(decompressedImages);
	            return product;
	        }).collect(Collectors.toList());

	        cart.setProducts(products);
	        return cart;
	    }).collect(Collectors.toList());
	}

	
	public List<Cart> findCartsHasSeen(Long userId) {
		List<Cart> carts = cartRepository.findAllCartsByUserIdWithProducts(userId);
	    
	    return carts.stream().map(cart -> {
	        List<Product> products = cart.getProducts().stream().map(product -> {
	        	List<ImageData> decompressedImages = product.getProduct_image().stream().map(imageData -> {
	        	    ImageData decompressedImage = new ImageData();
	        	    decompressedImage.setId(imageData.getId());
	        	    decompressedImage.setName(imageData.getName());
	        	    decompressedImage.setType(imageData.getType());
	        	    decompressedImage.setIsMainImage(imageData.getIsMainImage());
	        	    decompressedImage.setImageData(imageData.getImageData());
	        	    return decompressedImage;
	        	}).collect(Collectors.toList());

	        	product.setProduct_image(decompressedImages);

	            return product;
	        }).collect(Collectors.toList());

	        cart.setProducts(products);
	        return cart;
	    }).collect(Collectors.toList());
	}

	@Override
	public List<Cart> findAllCartsHasHandled() {
		   return cartRepository.findAllCartHasHandle();
	}





}
