package com.example.NVIDIA.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.AccessDTO;
import com.example.NVIDIA.model.Access;

@Component
public class AccessDTOMapper implements Function<Access, AccessDTO>{

	@Override
	public AccessDTO apply(Access access) {
		return new AccessDTO(
			access.getRoleName(),
			access.isStatus(),
			access.getDecentralizations()
			);
	}

}
