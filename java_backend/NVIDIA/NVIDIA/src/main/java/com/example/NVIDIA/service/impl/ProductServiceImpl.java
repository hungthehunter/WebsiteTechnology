package com.example.NVIDIA.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.Util.ImageDataUtil;
import com.example.NVIDIA.dto.ProductDTO;
import com.example.NVIDIA.mapper.ProductDTOMapper;
import com.example.NVIDIA.model.ImageData;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.model.Promotion;
import com.example.NVIDIA.repository.CategoryRepository;
import com.example.NVIDIA.repository.ImageDataRepository;
import com.example.NVIDIA.repository.ManufacturerRepository;
import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.repository.PromotionRepository;
import com.example.NVIDIA.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductDTOMapper productDTOMapper;

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private ImageDataRepository imageDataRepository;

    @Override
    public Product getById(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cannot find product"));

        // Load and decompress images
        List<ImageData> imageDataList = product.getProduct_image().stream()
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
        product.setProduct_image(imageDataList);
        return product;
    }


    @Override
    public List<Product> getAll() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(product -> {
            List<ImageData> imageDataList = product.getProduct_image().stream()
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

            product.setProduct_image(imageDataList);
            return product;
        }).collect(Collectors.toList());
    }


    @Override
    public void setMainImage(Product product) {
        if (product.getProduct_image() != null && !product.getProduct_image().isEmpty()) {
            product.setMainImage(product.getProduct_image().stream()
                .filter(imageData -> imageData != null && Boolean.TRUE.equals(imageData.getIsMainImage()))
                .findFirst()
                .orElse(null));
        } else {
            product.setMainImage(null);
        }
    }

    @Override
    public ProductDTO create(ProductDTO productDTO, List<MultipartFile> files, MultipartFile mainFile) throws IOException {
        // Create a new product
        Product product = new Product();
        product.setCpu(productDTO.getCpu());
        product.setGpu(productDTO.getGpu());
        product.setUnitPrice(productDTO.getUnitPrice());
        product.setUnitInStock(productDTO.getUnitInStock());
        product.setUnitInOrder(productDTO.getUnitInOrder());
        product.setBatteryCapacity(productDTO.getBatteryCapacity());
        product.setOperatingSystem(productDTO.getOperatingSystem());
        product.setScreen(productDTO.getScreen());
        product.setRam(productDTO.getRam());
        product.setProductName(productDTO.getProductName());
        product.setDesign(productDTO.getDesign());
        product.setWarrantyInformation(productDTO.getWarrantyInformation());
        product.setGeneralInformation(productDTO.getGeneralInformation());
        product.setStatus(productDTO.getStatus());
        product.setManufacturer(manufacturerRepository.findById(productDTO.getManufacturer().getId())
            .orElseThrow(() -> new RuntimeException("Cannot find manufacturer")));
        product.setCategory(categoryRepository.findById(productDTO.getCategory().getId())
            .orElseThrow(() -> new RuntimeException("Cannot find category")));
        Promotion savedPromotion = promotionRepository.save(productDTO.getPromotion());
        product.setPromotion(savedPromotion);

        // Save the product
        Product savedProduct = productRepository.save(product);

        // Process additional images
        if (files != null && !files.isEmpty()) {
            List<ImageData> fileDataList = new ArrayList<>();
            for (MultipartFile file : files) {
                ImageData imageData = ImageData.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .imageData(ImageDataUtil.compressImage(file.getBytes()))
                    .product(savedProduct)
                    .isMainImage(false) // Not the main image
                    .build();
                fileDataList.add(imageData);
            }
            // Save all image data
            imageDataRepository.saveAll(fileDataList);
            savedProduct.setProduct_image(fileDataList);
        }

        // Process main image
        if (mainFile != null && !mainFile.isEmpty()) {
            ImageData mainImageData = ImageData.builder()
                .name(mainFile.getOriginalFilename())
                .type(mainFile.getContentType())
                .imageData(ImageDataUtil.compressImage(mainFile.getBytes()))
                .product(savedProduct)
                .isMainImage(true) // Main image
                .build();
            // Save the main image data
            mainImageData = imageDataRepository.save(mainImageData);
            savedProduct.setMainImage(mainImageData);
        }

        return productDTOMapper.apply(savedProduct);
    }

    @Override
    public ProductDTO update(Long id, ProductDTO productDTO, List<MultipartFile> files, MultipartFile mainFile) throws IOException {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cannot find product"));

        // Update product properties
        product.setCpu(productDTO.getCpu());
        product.setGpu(productDTO.getGpu());
        product.setUnitPrice(productDTO.getUnitPrice());
        product.setUnitInStock(productDTO.getUnitInStock());
        product.setUnitInOrder(productDTO.getUnitInOrder());
        product.setBatteryCapacity(productDTO.getBatteryCapacity());
        product.setOperatingSystem(productDTO.getOperatingSystem());
        product.setScreen(productDTO.getScreen());
        product.setRam(productDTO.getRam());
        product.setProductName(productDTO.getProductName());
        product.setDesign(productDTO.getDesign());
        product.setWarrantyInformation(productDTO.getWarrantyInformation());
        product.setGeneralInformation(productDTO.getGeneralInformation());
        product.setStatus(productDTO.getStatus());
        product.setManufacturer(manufacturerRepository.findById(productDTO.getManufacturer().getId())
            .orElseThrow(() -> new RuntimeException("Cannot find manufacturer")));
        product.setCategory(categoryRepository.findById(productDTO.getCategory().getId())
            .orElseThrow(() -> new RuntimeException("Cannot find category")));
        Promotion savedPromotion = promotionRepository.save(productDTO.getPromotion());
        product.setPromotion(savedPromotion);

        // Update images
        if (files != null && !files.isEmpty()) {
            // Remove existing images
            List<ImageData> existingImages = imageDataRepository.findByProductId(id);
            imageDataRepository.deleteAll(existingImages);

            List<ImageData> fileDataList = new ArrayList<>();
            for (MultipartFile file : files) {
                ImageData imageData = ImageData.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .imageData(ImageDataUtil.compressImage(file.getBytes()))
                    .product(product)
                    .isMainImage(false)
                    .build();
                fileDataList.add(imageData);
            }
            // Save new image data
            imageDataRepository.saveAll(fileDataList);
            product.setProduct_image(fileDataList);
        }

        // Handle main image update
        if (mainFile != null && !mainFile.isEmpty()) {
            ImageData mainImageData = ImageData.builder()
                .name(mainFile.getOriginalFilename())
                .type(mainFile.getContentType())
                .imageData(ImageDataUtil.compressImage(mainFile.getBytes()))
                .product(product)
                .isMainImage(true)
                .build();
            // Save or update main image data
            mainImageData = imageDataRepository.save(mainImageData);
            product.setMainImage(mainImageData);
        }

        Product updatedProduct = productRepository.save(product);
        return productDTOMapper.apply(updatedProduct);
    }

    @Override
    public void delete(Long id) {
        // Optionally, delete associated images before deleting the product
        List<ImageData> existingImages = imageDataRepository.findByProductId(id);
        imageDataRepository.deleteAll(existingImages);
        productRepository.deleteById(id);
    }
}
