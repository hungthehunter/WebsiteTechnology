package com.example.NVIDIA.mapper;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import com.example.NVIDIA.dto.DecentralizationDTO;
import com.example.NVIDIA.dto.FunctionDTO;
import com.example.NVIDIA.model.Decentralization;

@Component
public class DecentralizationDTOMapper implements Function<Decentralization,DecentralizationDTO>{

	@Override
	public DecentralizationDTO apply(Decentralization decentralization) {
		// TODO Auto-generated method stub
		return new DecentralizationDTO(
				decentralization.getAccess(),
				decentralization.getFunctionIds().stream() 
                .map(func -> new FunctionDTO( func.getFunctionName()))
                .collect(Collectors.toList())
				);
	}

}
