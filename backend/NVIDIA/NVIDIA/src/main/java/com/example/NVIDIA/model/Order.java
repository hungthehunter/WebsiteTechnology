package com.example.NVIDIA.model;


import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="`order`")
public class Order {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="order_date")
	private Date order_date;
	
	@Column(name="total_price")
	private Double total_price;
	
	private boolean status;
	
	@ManyToOne
	@JoinColumn(name="address_id")
	private Address address;
	
	@Column(name="note",length=255)
	private String note;
	
	@Enumerated(EnumType.STRING)
	private ProcessingStates order_status;

	@OneToMany(mappedBy="order",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JsonManagedReference(value="order-order_item")
    private List<OrderItem> orderItem;
	
	@ManyToOne
	@JoinColumn(name="payment_id")
	@JsonBackReference(value="order-payment")
	private Payment payment;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	@JsonBackReference(value="order_user")
	private User user;
}
