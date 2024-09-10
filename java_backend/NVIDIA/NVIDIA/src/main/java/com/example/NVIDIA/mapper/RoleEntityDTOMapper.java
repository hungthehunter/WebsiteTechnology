package com.example.NVIDIA.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.RoleEntityDTO;
import com.example.NVIDIA.model.RoleEntity;

@Component
public class RoleEntityDTOMapper implements Function<RoleEntity, RoleEntityDTO>{

	@Override
	public RoleEntityDTO apply(RoleEntity roleEntity) {
		return new RoleEntityDTO(
				roleEntity.getRoleName()
				);
	}

}
