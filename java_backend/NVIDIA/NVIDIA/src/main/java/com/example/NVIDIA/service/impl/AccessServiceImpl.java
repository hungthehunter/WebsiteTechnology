package com.example.NVIDIA.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.dto.AccessDTO;
import com.example.NVIDIA.mapper.AccessDTOMapper;
import com.example.NVIDIA.model.Access;
import com.example.NVIDIA.repository.AccessRepository;
import com.example.NVIDIA.repository.DecentralizationRepository;
import com.example.NVIDIA.service.AccessService;

@Service
public class AccessServiceImpl implements AccessService{
	@Autowired
	private AccessRepository AccessRepository;
	
	@Autowired
	private AccessDTOMapper AccessDTOMapper;
	
	@Autowired
	private DecentralizationRepository decentralizationRepository;
	
	@Override
	public Access getById(Long id) {
		return AccessRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found Access"));
	}

	@Override
	public List<Access> getAll() {
		return AccessRepository.findAll();
	}

	@Override
	public AccessDTO create(AccessDTO AccessDTO) {
	Access Access=new Access();
	Access.setRoleName(Access.getRoleName());
	  Access createAccess = AccessRepository.save(Access);
		return AccessDTOMapper.apply(createAccess);
	}

	@Override
	public AccessDTO update(Long id, AccessDTO AccessDTO) {
		Access Access=AccessRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found Access"));
		Access.setRoleName(Access.getRoleName());
		Access updatedAccess = AccessRepository.save(Access);
			return AccessDTOMapper.apply(updatedAccess);
	}

	@Override
	public void delete(Long id) {
		AccessRepository.deleteById(id);
		
	}
}
