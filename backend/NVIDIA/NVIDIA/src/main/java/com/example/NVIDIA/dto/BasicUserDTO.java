package com.example.NVIDIA.dto;
import java.util.Date;
import java.util.List;

import com.example.NVIDIA.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BasicUserDTO {
	  private Long id;
	  private String fullname;
	  private String mobile;
	  private String email;
	  private String password;
	  private Date dateofbirth;
	  private List<BasicAddressDTO> addresses;
}
