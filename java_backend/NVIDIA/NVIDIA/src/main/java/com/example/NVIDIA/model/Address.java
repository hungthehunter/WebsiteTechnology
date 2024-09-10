package com.example.NVIDIA.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
}
