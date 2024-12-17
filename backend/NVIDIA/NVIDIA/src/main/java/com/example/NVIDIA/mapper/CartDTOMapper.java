package com.example.NVIDIA.mapper;
import java.util.function.Function;
import java.util.stream.Collectors;
import com.example.NVIDIA.dto.BasicAddressDTO;
import com.example.NVIDIA.dto.BasicProductDTO;
import com.example.NVIDIA.dto.BasicUserDTO;
import com.example.NVIDIA.dto.CartDTO;
import com.example.NVIDIA.model.Cart;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.model.User;
import org.springframework.stereotype.Component;
@Component
public class CartDTOMapper implements Function<Cart, CartDTO> {

	
    @Override
    public CartDTO apply(Cart cart) {
        return new CartDTO(
          cart.getId(),
         mapTOBasicUserDTO(cart.getUser()),
          mapToBasicProductDTO(cart.getProduct()),
          cart.getQuantity(),
          cart.getTotalPrice(),
          cart.getStatus()
        );
    }
    
    private BasicUserDTO mapTOBasicUserDTO(User user) {
    	if(user == null) {
    		return null;
    	}
    	return new BasicUserDTO(
    			user.getId(),
    			user.getFullname(),
    			user.getMobile(),
    			user.getEmail(),
    			user.getPassword(),
    			user.getDateofbirth(),
                user.getAddresses().stream()
                .map(address -> new BasicAddressDTO(
                    address.getId(),
                    address.getHouseNumber(),
                    address.getStreet(),
                    address.getWard(),
                    address.getDistrict(),
                    address.getCity(),
                    address.getCountry(),
                    address.isStatus()
                ))
                .collect(Collectors.toList())
    			);
    }
    
    
    private BasicProductDTO mapToBasicProductDTO(Product product) {
        if (product == null) {
            return null;
        }
        return new BasicProductDTO(
            product.getId(),
            product.getUnitPrice(),
            product.getUnitInStock(),
            product.getUnitInOrder(),
            product.getProductName(),
            product.isStatus(),
            product.getProduct_image().stream().collect(Collectors.toList())
//            product.getSpecification().stream().collect(Collectors.toList())
        );
    }
}
