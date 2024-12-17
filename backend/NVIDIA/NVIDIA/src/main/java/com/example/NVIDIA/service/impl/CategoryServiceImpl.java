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

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.NVIDIA.repository.PromotionRepository;
import com.example.NVIDIA.dto.CategoryDTO;
import com.example.NVIDIA.mapper.CategoryDTOMapper;
import com.example.NVIDIA.model.Category;
import com.example.NVIDIA.model.ImageCloud;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.repository.CategoryRepository;
import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryDTOMapper categoryDTOMapper;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public CategoryDTO getById(Long id) {
        Category category = categoryRepository.findByIdAndStatusTrue(id)
                .orElseThrow(() -> new RuntimeException("Cannot find category"));
        return categoryDTOMapper.apply(category);
    }

    @Override
    public List<CategoryDTO> getAll() {
        List<Category> category = categoryRepository.findAllByStatusTrue();
        return category.stream().map(categoryDTOMapper).collect(Collectors.toList());
    }

    @Override
    public Category create(Category categoryDTO, MultipartFile file) throws IOException {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setStatus(true);

        if (categoryDTO.getPromotion() != null) {
            category.setPromotion(promotionRepository.findById(categoryDTO.getPromotion().getId())
                    .orElseThrow(() -> new RuntimeException("Cannot find promotion")));
        }

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
            category.setImageCloud(imageCloud);
        }

        // Xử lý product
        if (categoryDTO.getProducts() != null) {
            List<Product> products = new ArrayList<>();
            for (Product productDTO : categoryDTO.getProducts()) {
                Product product = productRepository.findById(productDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Product not found with id: " + productDTO.getId()));

                if (product.getCategory() != null)
                    throw new RuntimeException("This product already have category");
                product.setCategory(category);
                products.add(product);
            }
            // Chỉ set products nếu danh sách không null
            category.setProducts(products);
        } else {
            category.setProducts(new ArrayList<>()); // Nếu không có sản phẩm, set một danh sách rỗng để tránh null
        }

        Category savedCategory = categoryRepository.save(category);
        return savedCategory;
    }

    @Override
    public Category update(Long id, Category categoryDTO, MultipartFile file) throws IOException {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (!optionalCategory.isPresent()) {
            throw new RuntimeException("Category not found with id: " + id);
        }

        Category category = optionalCategory.get();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setStatus(true);

        if (categoryDTO.getPromotion() != null) {
            category.setPromotion(promotionRepository.findById(categoryDTO.getPromotion().getId())
                    .orElseThrow(() -> new RuntimeException("Cannot find promotion")));
        }

        // Xử lý ảnh khi cập nhật
        if (file != null && !file.isEmpty()) {
            if (category.getImageCloud() != null) {
                cloudinary.uploader().destroy(category.getImageCloud().getPublic_id(), ObjectUtils.emptyMap());
            }

            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String publicId = uploadResult.get("public_id").toString();
            String url = uploadResult.get("url").toString();
            String format = uploadResult.get("format").toString();

            ImageCloud imageCloud = new ImageCloud();
            imageCloud.setPublic_id(publicId);
            imageCloud.setUrl(url);
            imageCloud.setFormat(format);
            imageCloud.setMainImage(true);
            category.setImageCloud(imageCloud);
        }

        // Xử lý product
        if (categoryDTO.getProducts() != null) {
            List<Product> products = categoryDTO.getProducts().stream()
                    .map(productDTO -> {
                        Product product = productRepository.findById(productDTO.getId())
                                .orElseThrow(
                                        () -> new RuntimeException("Product not found with id: " + productDTO.getId()));

                        if (product.getCategory() != null)
                            throw new RuntimeException("This product already have category");
                        product.setCategory(category);
                        return product;
                    })
                    .collect(Collectors.toList());

            category.setProducts(products);
        } else {
            category.setProducts(new ArrayList<>());
        }

        return categoryRepository.save(category);
    }

    @Override
    public void delete(Long id) throws IOException {
        // Tìm category bằng ID từ repository
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        // Xử lý Product
        // if(category.getProducts()!=null) {
        // List<Product> products=new ArrayList<>();
        // for(Product productDTO : category.getProducts()) {
        // Product product = productRepository.findById(productDTO.getId())
        // .orElseThrow(() -> new RuntimeException("Product not found with id: " +
        // productDTO.getId()));
        //
        // product.setCategory(null);
        // products.add(product);
        // }
        // category.setProducts(products);
        // }

        // Kiểm tra xem category có ảnh liên quan không và xóa từng ảnh từ Cloudinary
        // if (category.getImageCloud() != null) {
        // try {
        // // Xóa ảnh từ Cloudinary bằng public ID
        // Map<String, Object> result =
        // cloudinary.uploader().destroy(category.getImageCloud().getPublic_id(),
        // ObjectUtils.emptyMap());
        //
        // // Kiểm tra kết quả để đảm bảo việc xóa thành công
        // if (!"ok".equals(result.get("result"))) {
        // throw new IOException("Failed to delete image with public ID: " +
        // category.getImageCloud().getPublic_id());
        // }
        // } catch (Exception e) {
        // throw new IOException("Error deleting image with public ID: " +
        // category.getImageCloud().getPublic_id(), e);
        // }
        // }

        // Cuối cùng, xóa category khỏi repository
        category.setStatus(false);
        categoryRepository.save(category);
    }

}
