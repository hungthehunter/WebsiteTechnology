package com.example.NVIDIA.dto;

import java.sql.Date;

import com.example.NVIDIA.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactDTO {
private String contactEmail;

	private Date contactDate;
	

	private Date replyDate;
	

	private String contactContent;
	

	private String replyContent;

	private String status;
	
	private User responder;
}
