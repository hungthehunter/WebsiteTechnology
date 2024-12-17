package com.example.NVIDIA.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="contact")
public class Contact {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="contact_email" , length=255)
	private String contactEmail;
	
	
	@Column(name="contact_date")
	private Date contactDate;
	
	@Column(name="reply_date")
	private Date replyDate;
	
	@Column(name="contact_content" , length=255)
	private String contactContent;
	
	@Column(name="reply_content" , length=255)
	private String replyContent;
	
	@Column(name="status" , length=255)
	private String status;
	
@ManyToOne
@JoinColumn(name="responder_id",referencedColumnName="id")
private User responder;

}
