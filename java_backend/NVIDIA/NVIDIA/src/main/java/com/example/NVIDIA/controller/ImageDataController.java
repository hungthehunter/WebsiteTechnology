package com.example.NVIDIA.controller;


import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.NVIDIA.service.ImageDataService;
import java.util.Base64;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/image")
public class ImageDataController {

	@Autowired
	private ImageDataService service;

	// Hàm đưa hình ảnh vào database
	
	@PostMapping
	public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file) throws IOException {
		String uploadImage = service.uploadImage(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(uploadImage);
	}

	// Hàm lấy hình ảnh vào database
	
	@GetMapping("/{fileName}")
	public ResponseEntity<?> downloadImage(@PathVariable String fileName){
		byte[] imageData=service.downloadImage(fileName);
		return ResponseEntity.status(HttpStatus.OK)
				.contentType(MediaType.valueOf("image/png"))
				.body(imageData);

	}
	
	// Hàm đưa hình ảnh vào file
	
	@PostMapping("/fileSystem")
	public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("image")MultipartFile file) throws IOException {
		String uploadImage = service.uploadImageToFileSystem(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(uploadImage);
	}

	// Hàm lấy hình ảnh từ file
	
	@GetMapping("/fileSystem/{fileName}")
	public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException {
		byte[] imageData=service.downloadImageFromFileSystem(fileName);
		return ResponseEntity.status(HttpStatus.OK)
				.contentType(MediaType.valueOf("image/png"))
				.body(imageData);

	}
	
	// Hàm đưa danh sách hình ảnh vào file
	
	@PostMapping("/fileSystem/uploadMultiple")
	public ResponseEntity<?> uploadListOfImagesToFileSystem(@RequestParam("images") List<MultipartFile> files) throws IOException {
	    List<String> uploadResults = service.uploadListOfImageToFileSystem(files);
	    return ResponseEntity.status(HttpStatus.OK).body(uploadResults);
	}

	
	// Hàm lấy danh sách hình ảnh vào file
	
	@GetMapping("/fileSystem/downloadMultiple")
	public ResponseEntity<List<String>> downloadListOfImagesToFileSystem() throws IOException {
	    List<byte[]> imagesData = service.downloadListOfImageFromFileSystem();
	    
	    if (imagesData.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	    
	    // Mã hóa hình ảnh thành chuỗi base64
	    List<String> base64Images = imagesData.stream()
	            .map(imageData -> Base64.getEncoder().encodeToString(imageData))
	            .collect(Collectors.toList());
	    
	    return ResponseEntity.ok().body(base64Images);
	}


	
  
}
