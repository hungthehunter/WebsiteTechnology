package com.example.NVIDIA.service;
import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.NVIDIA.dto.PromotionDTO;
import com.example.NVIDIA.model.Promotion;

public interface PromotionService {
	    PromotionDTO getById(Long id);
	    List< PromotionDTO> getAll();
	    Promotion create(  Promotion  categoryDTO , MultipartFile file) throws IOException;
	    Promotion update(Long id,   Promotion categoryDTO , MultipartFile file) throws IOException;
	    void delete(Long id);
}
