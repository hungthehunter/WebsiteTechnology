package com.example.NVIDIA.mapper;

import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.NVIDIA.dto.AddressDTO;
import com.example.NVIDIA.dto.UserDTO;


import com.example.NVIDIA.model.User;

@Component
public class UserDTOMapper implements Function<User,UserDTO> {

	@Override
	public UserDTO apply(User user) {
		return new UserDTO(
				user.getFullname(),
			user.getEmail(),
			user.getMobile(),
			user.getPassword(),
			user.getDateofbirth(),
			user.getRole(),
			user.getDecentralization(),
			user.getAddresses().stream()
             .map(address -> new AddressDTO(
                 address.getHouseNumber(),
                 address.getStreet(),
                 address.getWard(),
                 address.getDistrict(),
                 address.getCity(),
                 address.getCountry()
             ))
             .collect(Collectors.toList())
				);
}
	}


