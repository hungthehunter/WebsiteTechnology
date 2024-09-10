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

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="invoice")
public class Invoice {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="issue_date")
	private Date issueDate;
	
	@Column(name="total_amount")
	private Double totalAmount;
	
	@ManyToOne
	@JoinColumn(name="customer_id",referencedColumnName="id")
	private User customer;
	
	@ManyToOne
	@JoinColumn(name="employee_id",referencedColumnName="id")
	private User employee;
}
