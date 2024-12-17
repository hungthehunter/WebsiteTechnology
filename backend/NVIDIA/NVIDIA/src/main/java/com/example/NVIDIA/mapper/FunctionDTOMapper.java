package com.example.NVIDIA.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.FunctionDTO;

@Component
public class FunctionDTOMapper implements Function<com.example.NVIDIA.model.Function, FunctionDTO>{

	@Override
	public FunctionDTO apply(com.example.NVIDIA.model.Function function) {

		return new FunctionDTO(
				function.getId(),
				function.isStatus(),
				function.getFunctionName()
				);
	}
	

	

}
