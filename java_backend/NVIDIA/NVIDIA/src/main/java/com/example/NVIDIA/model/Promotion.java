package com.example.NVIDIA.model;
import java.sql.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="promotion")
public class Promotion {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="promotion_name")
	private String promotionName;
	
	@Column(name="description")
	private String description;
	
	@Column(name="discount_percentage")
	private Double discountPercentage;
	
	@Column(name="start_date")
	private Date startDate;
	
	@Column(name="end_date")
	private Date end_date;
	
	@Column(name="status")
	private boolean status;
	
	
}
