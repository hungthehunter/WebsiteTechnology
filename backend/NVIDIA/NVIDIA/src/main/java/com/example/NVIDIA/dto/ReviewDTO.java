package com.example.NVIDIA.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
	private Long id;
	private int rating;
	private String comment;
	
	private LocalDate reviewDate;
	
	private BasicUserDTO user;
	private BasicProductDTO product;
}
