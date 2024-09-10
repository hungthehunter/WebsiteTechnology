package com.example.NVIDIA.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.RoleEntityDTO;
import com.example.NVIDIA.mapper.RoleEntityDTOMapper;
import com.example.NVIDIA.model.RoleEntity;
import com.example.NVIDIA.repository.RoleEntityRepository;
import com.example.NVIDIA.service.RoleEntityService;

@Service
public class RoleEntityServiceImpl implements RoleEntityService{

	@Autowired
	private RoleEntityRepository RoleEntityRepository;
	
	@Autowired
	private RoleEntityDTOMapper RoleEntityDTOMapper;
	
	@Override
	public RoleEntity getById(Long id) {
		return RoleEntityRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found RoleEntity"));
	}

	@Override
	public List<RoleEntity> getAll() {
		return RoleEntityRepository.findAll();
	}

	@Override
	public RoleEntityDTO create(RoleEntityDTO RoleEntityDTO) {
	RoleEntity RoleEntity=new RoleEntity();
	RoleEntity.setRoleName(RoleEntity.getRoleName());
	  RoleEntity createRoleEntity = RoleEntityRepository.save(RoleEntity);
		return RoleEntityDTOMapper.apply(createRoleEntity);
	}

	@Override
	public RoleEntityDTO update(Long id, RoleEntityDTO RoleEntityDTO) {
		RoleEntity RoleEntity=RoleEntityRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found RoleEntity"));
		RoleEntity.setRoleName(RoleEntity.getRoleName());
		RoleEntity updatedRoleEntity = RoleEntityRepository.save(RoleEntity);
			return RoleEntityDTOMapper.apply(updatedRoleEntity);
	}

	@Override
	public void delete(Long id) {
		RoleEntityRepository.deleteById(id);
		
	}



}
