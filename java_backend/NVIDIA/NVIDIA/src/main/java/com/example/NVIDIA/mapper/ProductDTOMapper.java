package com.example.NVIDIA.mapper;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import com.example.NVIDIA.dto.ProductDTO;
import com.example.NVIDIA.model.Product;
@Component
public class ProductDTOMapper implements Function<Product,ProductDTO>{
	@Override
	public ProductDTO apply(Product product) {
    
		
		return new ProductDTO(
		    product.getCpu(),
		    product.getGpu(),
			product.getUnitPrice(),
			product.getUnitInStock(),
			product.getUnitInOrder(),
			product.getBatteryCapacity(),
			product.getOperatingSystem(),
			product.getScreen(),
			product.getRam(),
			product.getProductName(),
			product.getDesign(),
			product.getWarrantyInformation(),
			product.getGeneralInformation(),
			product.getStatus(),
			product.getCategory(),
			product.getManufacturer(),
			product.getPromotion(),
			product.getProduct_image().stream().collect(Collectors.toList())
				);
	}

}
