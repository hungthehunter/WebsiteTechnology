package com.example.NVIDIA.model;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

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

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="payment")
@JsonIdentityInfo(
		  generator = ObjectIdGenerators.PropertyGenerator.class, 
		  property = "id")
public class Payment {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="nameOnCard",length=50)
	private String nameOnCard;
	
	@Column(name="cardNumber",length=50)
	private String cardNumber;
	
	@Column(name="expiringDate")
	private Date expiringDate;
	
	@Column(name="cvc")
	private String cvc;
	
	@Column(name="mobile")
	private String mobile;
	
	@Column(name="address")
	private String address;

	@Column(name="recipent")
	private String recipent;
	
	@ManyToOne
	@JoinColumn(name="user_id", referencedColumnName="id")
	@JsonBackReference(value="user-payment")
    private User user;

	
}
