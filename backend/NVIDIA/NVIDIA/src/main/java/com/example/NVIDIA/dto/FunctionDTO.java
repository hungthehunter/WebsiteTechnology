package com.example.NVIDIA.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FunctionDTO {
	private Long id;
	private boolean status;
	private String functionName;
}
