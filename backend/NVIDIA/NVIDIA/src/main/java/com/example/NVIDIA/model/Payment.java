package com.example.NVIDIA.model;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Table(name="payment")
@JsonIdentityInfo(
		  generator = ObjectIdGenerators.PropertyGenerator.class, 
		  property = "id")
public class Payment {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="payment_date",length=50)
	private Date payment_date;
	
	@Column(name="total_price",length=50)
	private Double total_price;
	
	@Column(name="payment_method")
	private PaymentMethod payment_method;
	
	@Column(name="payment_status")
	private String payment_status;
	
	@ManyToOne
	@JoinColumn(name="user_id", referencedColumnName="id")
	@JsonBackReference(value="user-payment")
    private User user;
	
	@OneToMany(mappedBy="payment",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JsonManagedReference(value="order-payment")
	private List<Order> order;
	
    @OneToOne(mappedBy = "payment", cascade = CascadeType.ALL)
    private CreditCardPayment creditCardPayment;
	

	
}
