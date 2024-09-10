package com.example.NVIDIA.model;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="`order`")
public class Order {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="delivery_address",length=255)
	private String deliveryAddress;
	
	@Column(name="note",length=255)
	private String note;
	
	@Column(name="recipient_name",length=255)
	private String recipientName;
	
	@Column(name="recipient_phone",length=255)
	private String recipientPhone;
	
	@Column(name="order_status",length=255)
	private String order_status;

	@Column(name="order_date")
	private Date order_date;
	
	@Column(name="delivery_date")
	private Date delivery_date;
	
	@Column(name="receipt_date")
	private Date receipt_date;
	
//	@ManyToOne
//	@JoinColumn(name="customer_id",referencedColumnName="id")
//	@JsonBackReference(value="user-orders")
//	private User customer;
	
//	@OneToMany(mappedBy = "orders", fetch = FetchType.LAZY, orphanRemoval = true)
//	@JsonManagedReference(value="orders-purchasehistories")
//	private List<PurchaseHistory> purchase_histories;
		
}
