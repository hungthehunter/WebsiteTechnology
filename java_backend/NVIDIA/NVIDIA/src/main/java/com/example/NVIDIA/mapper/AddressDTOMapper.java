package com.example.NVIDIA.mapper;

import java.util.function.Function;
import org.springframework.stereotype.Component;
import com.example.NVIDIA.dto.AddressDTO;
import com.example.NVIDIA.model.Address;

@Component
public class AddressDTOMapper implements Function<Address, AddressDTO>{

	@Override
	public AddressDTO apply(Address address) {
		
		return new AddressDTO(
				address.getHouseNumber(),
				address.getStreet(),
				address.getWard(),
				address.getDistrict(),
				address.getCity(),
				address.getCountry()

				);
	}

}
