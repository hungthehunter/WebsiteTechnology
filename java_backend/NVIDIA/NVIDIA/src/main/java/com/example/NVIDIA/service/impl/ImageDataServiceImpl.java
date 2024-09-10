package com.example.NVIDIA.service.impl;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.NVIDIA.Util.ImageDataUtil;
import com.example.NVIDIA.model.FileData;
import com.example.NVIDIA.model.ImageData;
import com.example.NVIDIA.repository.FileDataRepository;
import com.example.NVIDIA.repository.ImageDataRepository;
import com.example.NVIDIA.service.ImageDataService;

@Service
public class ImageDataServiceImpl implements ImageDataService{

	@Autowired
	private ImageDataRepository imageDataRepository;
	
	@Autowired
	private FileDataRepository fileDataRepository;
	
	
	// Folder path
	
	private final String FOLDER_PATH = "D:\\NopDoAn\\MyFiles\\";
	
	// Hàm up hình ảnh
	
    public String uploadImage(MultipartFile file) throws IOException {

        ImageData imageData = imageDataRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageDataUtil.compressImage(file.getBytes())).build());
        if (imageData != null) {
            return "file uploaded successfully : " + file.getOriginalFilename();
        }
        return null;
    }
	  // Hàm đưa hình ảnh vào file
	  
    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
        String filePath=FOLDER_PATH+file.getOriginalFilename();

        FileData fileData=fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());

        file.transferTo(new File(filePath));

        if (fileData != null) {
            return "file uploaded successfully : " + filePath;
        }
        return null;
    }
    
    // Hàm đưa danh sách hình ảnh vào file(LIST)
    
    public List<String> uploadListOfImageToFileSystem(List<MultipartFile> listOfFile) throws IOException{
    	List<String> uploadedFilePaths=new ArrayList<String>();
    	for(MultipartFile file: listOfFile) {
    		String filePath=FOLDER_PATH+file.getOriginalFilename();
    		  FileData fileData=fileDataRepository.save(FileData.builder()
  	                .name(file.getOriginalFilename())
  	                .type(file.getContentType())
  	                .filePath(filePath).build());
    		   file.transferTo(new File(filePath));

    	        if (fileData != null) {
    	            uploadedFilePaths.add("File uploaded successfully: " + filePath);
    	        } else {
    	            uploadedFilePaths.add("Failed to upload: " + file.getOriginalFilename());
    	        }
    	}
        return null;
    }

	 
	 // Hàm lấy hình ảnh
    
	  public byte[] downloadImage(String fileName){
	        Optional<ImageData> dbImageData = imageDataRepository.findByName(fileName);
	        byte[] images=ImageDataUtil.decompressImage(dbImageData.get().getImageData());
	        return images;
	    }
	  

	    // Hàm lấy hình ảnh từ file
	    
	    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
	        Optional<FileData> fileData = fileDataRepository.findByName(fileName);
	        String filePath=fileData.get().getFilePath();
	        byte[] images = Files.readAllBytes(new File(filePath).toPath());
	        return images;
	    }
	    
	 // Hàm lấy danh sách hình ảnh từ file
	    
	    public List<byte[]> downloadListOfImageFromFileSystem() throws IOException {
	        List<byte[]> imagesList = new ArrayList<>();
	        List<FileData> fileDataList = fileDataRepository.findAll();
	        
	        if (fileDataList != null && !fileDataList.isEmpty()) {
	            for (FileData fileData : fileDataList) {
	                String filePath = fileData.getFilePath();
	                byte[] imageData = Files.readAllBytes(new File(filePath).toPath());
	                imagesList.add(imageData);
	            }
	        }

	        return imagesList;
	    }

		@Override
		 public String getImageAsBase64(Long imageId) {
	        ImageData imageData = imageDataRepository.findById(imageId).orElseThrow(()-> new RuntimeException("Cannot find image"));
	        byte[] imageBytes = imageData.getImageData();
	        return Base64.getEncoder().encodeToString(imageBytes);
	    }

	    


}
