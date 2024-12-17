package com.example.NVIDIA.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.repository.PromotionRepository;
import com.example.NVIDIA.repository.ReviewRepository;
import com.example.NVIDIA.repository.SpecificationRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.NVIDIA.repository.CategoryRepository;
import com.example.NVIDIA.repository.ManufacturerRepository;
import com.example.NVIDIA.dto.ProductDTO;
import com.example.NVIDIA.mapper.ProductDTOMapper;
import com.example.NVIDIA.model.ImageCloud;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.model.Review;
import com.example.NVIDIA.service.ProductService;

import jakarta.transaction.Transactional;

import com.example.NVIDIA.model.Specification;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private Cloudinary cloudinary;
	
	@Autowired
	private ProductDTOMapper productDTOMapper;
	
	@Autowired
	private ManufacturerRepository manufacturerRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private PromotionRepository promotionRepository;
	
	@Autowired
	private SpecificationRepository specificationRepository;
	@Override
	public ProductDTO getById(Long id) {
	    Product product = productRepository.findByIdAndStatusTrue(id)
	        .orElseThrow(() -> new RuntimeException("Cannot find product"));
	    return productDTOMapper.apply(product); // Chuyển đổi sang ProductDTO
	}

	@Override
	public List<ProductDTO> getAll() {
	    List<Product> products = productRepository.findAllByStatusTrue();
	    return products.stream()
	        .map(productDTOMapper) // Chuyển đổi từng Product sang ProductDTO
	        .collect(Collectors.toList());
	}
	
	@Override
	public List<ProductDTO> getAllByManufacturerId(Long id){
		List<Product> products = productRepository.findAllByManufacturerId(id);
		return products.stream()
	        .map(productDTOMapper)
	        .collect(Collectors.toList());
	}

	@Override
	public Product create(Product productDTO, List<MultipartFile> listOfFile, MultipartFile file) throws IOException {

	    Product product = new Product();
		System.out.println(productDTO.getPromotion().getId());

	    product.setUnitPrice(productDTO.getUnitPrice());
	    product.setUnitInStock(productDTO.getUnitInStock());
	    product.setUnitInOrder(productDTO.getUnitInOrder());

	    product.setProductName(productDTO.getProductName());

	    product.setStatus(true);
	   
	    if(productDTO.getPromotion() != null && productDTO.getPromotion().getId() != null) {
	    	product.setPromotion(promotionRepository.findById(productDTO.getPromotion().getId()).orElseThrow(()-> new RuntimeException("Failed to find promotion")));
	    }
	    
	    if(productDTO.getManufacturer() != null) {
	    product.setManufacturer(manufacturerRepository.findById(productDTO.getManufacturer().getId()).orElseThrow(()-> new RuntimeException("Failed to find manufacturer")));
	    }
	    
	    if(productDTO.getCategory() != null) {
	    product.setCategory(categoryRepository.findById(productDTO.getCategory().getId()).orElseThrow(()-> new RuntimeException("Failed to find category")));
	    }
	    
	    // Set specifications
	    if (productDTO.getSpecification() != null) {
	        List<Specification> specifications = productDTO.getSpecification().stream()
	            .map(spec -> {
	                Specification specification = new Specification();
	                specification.setSpecificationName(spec.getSpecificationName());
	                specification.setSpecificationData(spec.getSpecificationData());
	                specification.setProduct(product); // Set the product reference
	                return specification;
	            }).collect(Collectors.toList());

	        product.setSpecification(specifications);  // Assuming you have a list field in `Product`
	    }
	    
	    
	    
	    // Khởi tạo danh sách product_image nếu nó là null
	    if (product.getProduct_image() == null) {
	        product.setProduct_image(new ArrayList<>());
	    }

	    // Xử lý ảnh chính
	    if (file != null && !file.isEmpty()) {
	        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
	        String publicId = uploadResult.get("public_id").toString();
	        String url = uploadResult.get("url").toString();
	        String format = uploadResult.get("format").toString();
	        
	        ImageCloud mainImage = new ImageCloud();
	        mainImage.setPublic_id(publicId);
	        mainImage.setUrl(url);
	        mainImage.setFormat(format);
	        mainImage.setMainImage(true); 
	        mainImage.setProduct(product); 
	        product.getProduct_image().add(mainImage);
	    }

	    // Xử lý các ảnh phụ
	    if (listOfFile != null && !listOfFile.isEmpty()) {
	        for (MultipartFile multipartFile : listOfFile) {
	            if (multipartFile != null && !multipartFile.isEmpty()) {
	                Map<?, ?> uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), ObjectUtils.emptyMap());
	                String publicId = uploadResult.get("public_id").toString();
	                String url = uploadResult.get("url").toString();
	                String format = uploadResult.get("format").toString();
	                
	                ImageCloud image = new ImageCloud();
	                image.setPublic_id(publicId);
	                image.setUrl(url);
	                image.setFormat(format);
	                image.setMainImage(false); 
	                image.setProduct(product); 
	                product.getProduct_image().add(image); 
	            }
	        }
	    }

	    // Lưu sản phẩm vào cơ sở dữ liệu
	    Product savedProduct = productRepository.save(product);

	    return savedProduct;
	}


	@Override
	public Product update(Long id, Product productDTO, List<MultipartFile> listOfFile, MultipartFile file) throws IOException {
	    Optional<Product> optionalProduct = productRepository.findById(id);
	    if (!optionalProduct.isPresent()) {
	        throw new RuntimeException("Product not found with id: " + id);
	    }

	    Product product = optionalProduct.get();
	    product.setStatus(true);

	    // Cập nhật promotion nếu có sự thay đổi và không null
	    if (productDTO.getPromotion() != null) {
	        Long newPromotionId = productDTO.getPromotion().getId();
	        if (newPromotionId != null && !newPromotionId.equals(product.getPromotion() != null ? product.getPromotion().getId() : null)) {
	            product.setPromotion(promotionRepository.findById(newPromotionId)
	                .orElseThrow(() -> new RuntimeException("Failed to find promotion")));
	        }
	    }

	    // Cập nhật manufacturer nếu có sự thay đổi và không null
	    if (productDTO.getManufacturer() != null) {
	        Long newManufacturerId = productDTO.getManufacturer().getId();
	        if (newManufacturerId != null && !newManufacturerId.equals(product.getManufacturer() != null ? product.getManufacturer().getId() : null)) {
	            product.setManufacturer(manufacturerRepository.findById(newManufacturerId)
	                .orElseThrow(() -> new RuntimeException("Failed to find manufacturer")));
	        }
	    }

	    // Cập nhật category nếu có sự thay đổi và không null
	    if (productDTO.getCategory() != null) {
	        Long newCategoryId = productDTO.getCategory().getId();
	        if (newCategoryId != null && !newCategoryId.equals(product.getCategory() != null ? product.getCategory().getId() : null)) {
	            product.setCategory(categoryRepository.findById(newCategoryId)
	                .orElseThrow(() -> new RuntimeException("Failed to find category")));
	        }
	    }

	    // Cập nhật specifications
	    if (productDTO.getSpecification() != null) {
	        // Xóa tất cả specifications cũ bằng cách đặt lại danh sách specifications
	        product.getSpecification().clear();

	        // Thêm các specifications mới
	        List<Specification> specifications = productDTO.getSpecification().stream()
	            .map(spec -> {
	                Specification specification = new Specification();
	                specification.setSpecificationName(spec.getSpecificationName());
	                specification.setSpecificationData(spec.getSpecificationData());
	                specification.setProduct(product);
	                return specification;
	            }).collect(Collectors.toList());

	        product.getSpecification().addAll(specifications);
	    }

	    // Xóa tất cả hình ảnh cũ
	    List<ImageCloud> oldImages = new ArrayList<>(product.getProduct_image());
	    product.getProduct_image().clear(); // Xóa tất cả hình ảnh cũ trong danh sách

	    // Xóa hình ảnh cũ trên Cloudinary
	    for (ImageCloud image : oldImages) {
	        try {
	            cloudinary.uploader().destroy(image.getPublic_id(), ObjectUtils.emptyMap());
	        } catch (IOException e) {
	            throw new RuntimeException("Failed to delete old image: " + e.getMessage());
	        }
	    }

	    // Cập nhật hình ảnh chính
	    if (file != null && !file.isEmpty()) {
	        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
	        String publicId = uploadResult.get("public_id").toString();
	        String url = uploadResult.get("url").toString();
	        String format = uploadResult.get("format").toString();

	        ImageCloud mainImage = new ImageCloud();
	        mainImage.setPublic_id(publicId);
	        mainImage.setUrl(url);
	        mainImage.setFormat(format);
	        mainImage.setMainImage(true);
	        mainImage.setProduct(product);
	        product.getProduct_image().add(mainImage);
	    }

	    // Cập nhật các hình ảnh phụ
	    if (listOfFile != null && !listOfFile.isEmpty()) {
	        for (MultipartFile multipartFile : listOfFile) {
	            if (multipartFile != null && !multipartFile.isEmpty()) {
	                Map<?, ?> uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), ObjectUtils.emptyMap());
	                String publicId = uploadResult.get("public_id").toString();
	                String url = uploadResult.get("url").toString();
	                String format = uploadResult.get("format").toString();

	                ImageCloud image = new ImageCloud();
	                image.setPublic_id(publicId);
	                image.setUrl(url);
	                image.setFormat(format);
	                image.setMainImage(false);
	                image.setProduct(product);
	                product.getProduct_image().add(image);
	            }
	        }
	    }

	    // Lưu sản phẩm vào cơ sở dữ liệu
	    Product updatedProduct = productRepository.save(product);
	    return updatedProduct;
	}


	
	@Override
	@Transactional
	public void delete(Long id) throws IOException {
	    Optional<Product> optionalProduct = productRepository.findById(id);

	    if (!optionalProduct.isPresent()) {
	        throw new RuntimeException("Product not found with id: " + id);
	    }

	    Product product = optionalProduct.get();
	    


	    // Thực hiện xóa sản phẩm bằng phương thức custom
//	    productRepository.customDeleteById(id);
	    product.setStatus(false);
        productRepository.save(product);
	}

}
