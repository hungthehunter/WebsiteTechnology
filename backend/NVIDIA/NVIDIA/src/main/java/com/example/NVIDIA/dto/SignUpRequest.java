package com.example.NVIDIA.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SignUpRequest {
private String fullname;
private String email;
private String mobile;
private String password;
private Date dateofbirth;
}
