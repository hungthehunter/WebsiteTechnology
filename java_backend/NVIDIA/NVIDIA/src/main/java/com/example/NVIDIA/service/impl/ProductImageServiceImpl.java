package com.example.NVIDIA.service.impl;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.ProductImageDTO;
import com.example.NVIDIA.mapper.ProductImageDTOMapper;
import com.example.NVIDIA.model.ProductImage;
import com.example.NVIDIA.repository.ProductImageRepository;
import com.example.NVIDIA.service.ProductImageService;


@Service
public class ProductImageServiceImpl implements ProductImageService{

	@Autowired
	private ProductImageRepository productImageRepository;
	
	@Autowired
	private ProductImageDTOMapper productImageDTOMapper;
	
	@Override
	public ProductImageDTO getById(Long id) {
		ProductImage product=productImageRepository.findById(id).orElseThrow(()-> new RuntimeException("Cannot found product"));
		return productImageDTOMapper.apply(product);
	}

	@Override
	public List<ProductImage> getAll() {
		
		return productImageRepository.findAll();
	}

	@Override
	public ProductImageDTO create(ProductImageDTO productImageDTO) {
		ProductImage productImage=new ProductImage();
		productImage.setMainPicture(productImageDTO.getMainPicture());
		
		productImage.setListProductPicture(productImageDTO.getListProductPicture().stream().collect(Collectors.toList()));
		return productImageDTOMapper.apply(productImage);
	}

	@Override
	public ProductImageDTO update(Long id, ProductImageDTO productImageDTO) {
		ProductImage productImage=productImageRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found productImage"));
		productImage.setMainPicture(productImageDTO.getMainPicture());
		productImage.setListProductPicture(productImageDTO.getListProductPicture().stream().collect(Collectors.toList()));
		return productImageDTOMapper.apply(productImage);
	}

	@Override
	public void delete(Long id) {
		productImageRepository.deleteById(id);
		
	}

}
