package com.example.NVIDIA.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
import lombok.ToString;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Table(name="address")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Address {
	  @Id 
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;
	  @Column(length=255)
	  private String houseNumber;
	  @Column(length=255)
	  private String street;
	  @Column(length=255)
	  private String ward;
	  @Column(length=255)
	  private String district;
	  @Column(length=255)
	  private String city;
	  @Column(length=255)
	  private String country;
	  private boolean status;
	  
	  @ManyToOne 
	  @JoinColumn(name = "user_id")
	  @JsonBackReference(value="user-address")
	  private User user;
}
