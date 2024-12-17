package com.example.NVIDIA.dto;
import java.util.Date;
import java.util.List;

import com.example.NVIDIA.model.Decentralization;
import com.example.NVIDIA.model.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	  private Long id;
	  private String fullname;
	  private String mobile;
	  private String email;
	  private String password;
	  private Date dateofbirth;
	  private boolean status;
	  private Double salary;
	  private Role role;
	  private Decentralization decentralization;
	  private List<BasicAddressDTO> addresses;
}
