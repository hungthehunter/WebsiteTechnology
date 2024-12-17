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
import com.example.NVIDIA.dto.ManufacturerDTO;
import com.example.NVIDIA.mapper.ManufacturerDTOMapper;
import com.example.NVIDIA.model.ImageCloud;
import com.example.NVIDIA.model.Manufacturer;
import com.example.NVIDIA.model.Product;
import com.example.NVIDIA.repository.ManufacturerRepository;
import com.example.NVIDIA.repository.ProductRepository;
import com.example.NVIDIA.service.ManufacturerService;

@Service
public class ManufacturerServiceImpl implements ManufacturerService {

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Autowired
    private ManufacturerDTOMapper manufacturerDTOMapper;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ManufacturerDTO getById(Long id) {
        Manufacturer manufacturer = manufacturerRepository.findByIdAndStatusTrue(id)
                .orElseThrow(() -> new RuntimeException("Cannot find manufacturer"));
        return manufacturerDTOMapper.apply(manufacturer);
    }

    @Override
    public List<ManufacturerDTO> getAll() {
        List<Manufacturer> manufacturer = manufacturerRepository.findAllByStatusTrue();
        return manufacturer.stream().map(manufacturerDTOMapper).collect(Collectors.toList());
    }

    @Override
    public Manufacturer create(Manufacturer manufacturerDTO, MultipartFile file) throws IOException {
        Manufacturer manufacturer = new Manufacturer();
        manufacturer.setName(manufacturerDTO.getName());
        manufacturer.setCountry(manufacturerDTO.getCountry());
        manufacturer.setWebsite(manufacturerDTO.getWebsite());
        manufacturer.setDescription(manufacturerDTO.getDescription());
        manufacturer.setEmail(manufacturerDTO.getEmail());
        manufacturer.setPhone(manufacturerDTO.getPhone());
        manufacturer.setAddress(manufacturerDTO.getAddress());
        manufacturer.setCreatedAt(manufacturerDTO.getCreatedAt());
        manufacturer.setUpdatedAt(manufacturerDTO.getUpdatedAt());
        manufacturer.setStatus(true);

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
            manufacturer.setImageCloud(imageCloud);
        }

        // Xử lý product
        if (manufacturerDTO.getProducts() != null) {
            List<Product> products = new ArrayList<>();
            for (Product productDTO : manufacturerDTO.getProducts()) {
                Product product = productRepository.findById(productDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Product not found with id: " + productDTO.getId()));

                if (product.getManufacturer() != null)
                    throw new RuntimeException("This product already have manufacturer");
                product.setManufacturer(manufacturer);
                products.add(product);
            }
            manufacturer.setProducts(products);
        } else {
            manufacturer.setProducts(new ArrayList<>()); // Set a new empty list if no products are provided
        }

        Manufacturer savedManufacturer = manufacturerRepository.save(manufacturer);
        return savedManufacturer;
    }

    @Override
    public Manufacturer update(Long id, Manufacturer manufacturerDTO, MultipartFile file) throws IOException {
        Optional<Manufacturer> optionalManufacturer = manufacturerRepository.findById(id);
        if (!optionalManufacturer.isPresent()) {
            throw new RuntimeException("Manufacturer not found with id: " + id);
        }

        Manufacturer manufacturer = optionalManufacturer.get();
        manufacturer.setName(manufacturerDTO.getName());
        manufacturer.setCountry(manufacturerDTO.getCountry());
        manufacturer.setWebsite(manufacturerDTO.getWebsite());
        manufacturer.setDescription(manufacturerDTO.getDescription());
        manufacturer.setEmail(manufacturerDTO.getEmail());
        manufacturer.setPhone(manufacturerDTO.getPhone());
        manufacturer.setAddress(manufacturerDTO.getAddress());
        manufacturer.setCreatedAt(manufacturerDTO.getCreatedAt());
        manufacturer.setUpdatedAt(manufacturerDTO.getUpdatedAt());
        manufacturer.setStatus(true);

        // Xử lý ảnh khi cập nhật
        if (file != null && !file.isEmpty()) {
            // Xóa ảnh cũ trên Cloudinary nếu tồn tại
            if (manufacturer.getImageCloud() != null) {
                cloudinary.uploader().destroy(manufacturer.getImageCloud().getPublic_id(), ObjectUtils.emptyMap());
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
            manufacturer.setImageCloud(imageCloud);
        }

        // Xử lý sản phẩm
        if (manufacturerDTO.getProducts() != null && !manufacturerDTO.getProducts().isEmpty()) {
            List<Product> products = manufacturerDTO.getProducts().stream()
                    .map(productItem -> {
                        Product product = productRepository.findById(productItem.getId())
                                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productItem));

                        if (product.getManufacturer() != null)
                            throw new RuntimeException("This product already have manufacturer");
                        product.setManufacturer(manufacturer);
                        return product;
                    })
                    .collect(Collectors.toList());

            manufacturer.setProducts(products);
        } else {
            manufacturer.setProducts(new ArrayList<>()); // Đặt danh sách sản phẩm trống nếu không có sản phẩm nào được
                                                         // cung cấp
        }

        Manufacturer updatedManufacturer = manufacturerRepository.save(manufacturer);
        return updatedManufacturer;
    }

    @Override
    public void delete(Long id) {
        Manufacturer manufacturer = manufacturerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find manufacturer"));

        // Xử lý product
        // if(manufacturer.getProducts()!=null) {
        // List<Product> products=new ArrayList<>();
        // for(Product productDTO : manufacturer.getProducts()) {
        // Product product = productRepository.findById(productDTO.getId())
        // .orElseThrow(() -> new RuntimeException("Product not found with id: " +
        // productDTO.getId()));
        //
        // product.setManufacturer(null);
        // products.add(product);
        // }
        // manufacturer.setProducts(products);
        // }
        manufacturer.setStatus(true);
        manufacturerRepository.save(manufacturer);
    }
}
