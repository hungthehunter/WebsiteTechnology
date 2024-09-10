package com.example.NVIDIA.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.FunctionDTO;
import com.example.NVIDIA.mapper.FunctionDTOMapper;
import com.example.NVIDIA.model.Function;
import com.example.NVIDIA.repository.FunctionRepository;
import com.example.NVIDIA.service.FunctionService;

@Service
public class FunctionServiceImpl implements FunctionService{

	@Autowired
	private FunctionRepository functionRepository;
	
	@Autowired
	private FunctionDTOMapper functionDTOMapper;
	
	@Override
	public Function getById(Long id) {
		return functionRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found function"));
	}

	@Override
	public List<Function> getAll() {
		return functionRepository.findAll();
	}

	@Override
	public FunctionDTO create(FunctionDTO FunctionDTO) {
	Function function=new Function();
	function.setFunctionName(FunctionDTO.getFunctionName());
	  Function createFunction = functionRepository.save(function);
		return functionDTOMapper.apply(createFunction);
	}

	@Override
	public FunctionDTO update(Long id, FunctionDTO FunctionDTO) {
		Function function=functionRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found function"));
		function.setFunctionName(FunctionDTO.getFunctionName());
		  Function updatedFunction = functionRepository.save(function);
			return functionDTOMapper.apply(updatedFunction);
	}

	@Override
	public void delete(Long id) {
		functionRepository.deleteById(id);
		
	}
}
