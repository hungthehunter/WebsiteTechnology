package com.example.NVIDIA.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ImageDataService {
String uploadImage(MultipartFile file) throws IOException;
byte[] downloadImage(String fileName);
byte[] downloadImageFromFileSystem(String fileName) throws IOException;
String uploadImageToFileSystem(MultipartFile file) throws IOException;
List<String> uploadListOfImageToFileSystem(List<MultipartFile> listOfFile) throws IOException;
List<byte[]> downloadListOfImageFromFileSystem() throws IOException;
String getImageAsBase64(Long imageId);
}
