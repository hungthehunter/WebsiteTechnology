package com.example.NVIDIA.service.impl;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.NVIDIA.dto.PromotionDTO;
import com.example.NVIDIA.mapper.PromotionDTOMapper;
import com.example.NVIDIA.model.Category;
import com.example.NVIDIA.model.ImageCloud;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.model.Promotion;
import com.example.NVIDIA.repository.PromotionRepository;
import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.repository.CategoryRepository;
import com.example.NVIDIA.service.PromotionService;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PromotionDTOMapper promotionDTOMapper;
    
    @Autowired
	private Cloudinary cloudinary;

    @Override
    public PromotionDTO getById(Long id) {
    	
        Promotion promotion= promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find promotion"));
        
        return promotionDTOMapper.apply(promotion);
    }

    @Override
    public List<PromotionDTO> getAll() {
    	List<Promotion> promotion = promotionRepository.findAll();
    	return promotion.stream().map(promotionDTOMapper).collect(Collectors.toList());
    }

    @Override
    public Promotion create(Promotion promotionDTO, MultipartFile file) throws IOException{
        Promotion promotion = new Promotion();
        promotion.setName(promotionDTO.getName());
        promotion.setDescription(promotionDTO.getDescription());
        promotion.setDiscountPercentage(promotionDTO.getDiscountPercentage());
        promotion.setStartDate(promotionDTO.getStartDate());
        promotion.setEndDate(promotionDTO.getEndDate());
        promotion.setActive(true);
        promotion.setCreatedAt(LocalDateTime.now()); 
        promotion.setUpdatedAt(LocalDateTime.now()); 
        
        // Xử lý ảnh
        if (file != null && !file.isEmpty()) {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String publicId = uploadResult.get("public_id").toString();
            String url = uploadResult.get("url").toString();
            String format = uploadResult.get("format").toString();

            ImageCloud imageCloud = new ImageCloud();
            imageCloud.setPublic_id(publicId);
            imageCloud.setUrl(url);
            imageCloud.setFormat(format);
            imageCloud.setMainImage(true); // Đặt là ảnh chính
            promotion.setImageCloud(imageCloud);
        }

     // Xử lý applicableProducts
        if (promotionDTO.getApplicableProducts() != null) {
            List<Product> applicableProducts = new ArrayList<>();
            for (Product productDTO : promotionDTO.getApplicableProducts()) {
                if (productDTO.getId() == null) { // Kiểm tra id null
                    throw new IllegalArgumentException("Product ID must not be null");
                }

                Product product = productRepository.findById(productDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + productDTO.getId()));

                // Thiết lập quan hệ Promotion cho Product
                if (product.getPromotion() != null) throw new RuntimeException("This product already have promotion");
                product.setPromotion(promotion);
                applicableProducts.add(product);
            }
            promotion.setApplicableProducts(applicableProducts);
        } else {
            promotion.setApplicableProducts(null); // Không cần thiết nhưng có thể thêm cho rõ ràng
        }

        // Xử lý applicableCategories
        if (promotionDTO.getApplicableCategories() != null) {
            List<Category> applicableCategories = new ArrayList<>();
            for (Category categoryDTO : promotionDTO.getApplicableCategories()) {
                if (categoryDTO.getId() == null) { // Kiểm tra id null
                    throw new IllegalArgumentException("Category ID must not be null");
                }

                Category category = categoryRepository.findById(categoryDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryDTO.getId()));

                // Thiết lập quan hệ Promotion cho Category
                if (category.getPromotion() != null) throw new RuntimeException("This category already have promotion");
                category.setPromotion(promotion);
                applicableCategories.add(category);
            }
            promotion.setApplicableCategories(applicableCategories);
        } else {
            promotion.setApplicableCategories(null); // Không cần thiết nhưng có thể thêm cho rõ ràng
        }


        Promotion savedPromotion = promotionRepository.save(promotion);
        return savedPromotion;
    }



    @Override
    public Promotion update(Long id, Promotion promotionDTO, MultipartFile file) throws IOException {
        // Tìm Promotion
        Optional<Promotion> optionalPromotion = promotionRepository.findById(id);
        if (!optionalPromotion.isPresent()) {
            throw new RuntimeException("Promotion not found with id: " + id);
        }

        Promotion promotion = optionalPromotion.get();
        promotion.setName(promotionDTO.getName());
        promotion.setDescription(promotionDTO.getDescription());
        promotion.setDiscountPercentage(promotionDTO.getDiscountPercentage());
        promotion.setStartDate(promotionDTO.getStartDate());
        promotion.setEndDate(promotionDTO.getEndDate());
        promotion.setActive(promotionDTO.isActive());
        promotion.setUpdatedAt(LocalDateTime.now());
        
        // Xử lý ảnh khi cập nhật
        if (file != null && !file.isEmpty()) {
            // Xóa ảnh cũ trên Cloudinary nếu tồn tại
            if (promotion.getImageCloud() != null) {
                cloudinary.uploader().destroy(promotion.getImageCloud().getPublic_id(), ObjectUtils.emptyMap());
            }

            // Tải ảnh mới lên Cloudinary
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String publicId = uploadResult.get("public_id").toString();
            String url = uploadResult.get("url").toString();
            String format = uploadResult.get("format").toString();

            // Tạo đối tượng ImageCloud mới
            ImageCloud imageCloud = new ImageCloud();
            imageCloud.setPublic_id(publicId);
            imageCloud.setUrl(url);
            imageCloud.setFormat(format);
            imageCloud.setMainImage(true); // Đặt là ảnh chính mới
            promotion.setImageCloud(imageCloud);
        }

        // Xử lý applicableProducts
        if (promotionDTO.getApplicableProducts() != null) {
            List<Product> applicableProducts = new ArrayList<>();
            for (Product productDTO : promotionDTO.getApplicableProducts()) {
                Product product = productRepository.findById(productDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + productDTO.getId()));
                
                // Thiết lập quan hệ Promotion cho Product
                product.setPromotion(promotion);
                applicableProducts.add(product);
            }
            promotion.setApplicableProducts(applicableProducts);
        }

        // Xử lý applicableCategories
        if (promotionDTO.getApplicableCategories() != null) {
            List<Category> applicableCategories = new ArrayList<>();
            for (Category categoryDTO : promotionDTO.getApplicableCategories()) {
                Category category = categoryRepository.findById(categoryDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryDTO.getId()));
                
                // Thiết lập quan hệ Promotion cho Category
                if (category.getPromotion() != null) throw new RuntimeException("This category already have promotion");
                category.setPromotion(promotion);
                applicableCategories.add(category);
            }
            promotion.setApplicableCategories(applicableCategories);
        }

        Promotion updatedPromotion = promotionRepository.save(promotion);
        return updatedPromotion;
    }



    @Override
    public void delete(Long id) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find promotion"));
        
        promotion.setActive(false);

        // Xóa promotion
        promotionRepository.save(promotion);
    }

}
