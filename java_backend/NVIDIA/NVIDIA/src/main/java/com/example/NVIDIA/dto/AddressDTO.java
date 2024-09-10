package com.example.NVIDIA.dto;

import com.example.NVIDIA.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
	private String houseNumber;
	  private String street;
	  private String ward;
	  private String district;
	  private String city;
	  private String country;
}
