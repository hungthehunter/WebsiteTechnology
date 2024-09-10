package com.example.NVIDIA.dto;
import java.util.List;
import com.example.NVIDIA.model.Access;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DecentralizationDTO {
	private Access access;
    private List<FunctionDTO> functionIds;
}
