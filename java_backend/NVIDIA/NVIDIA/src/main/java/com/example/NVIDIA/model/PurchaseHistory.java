package com.example.NVIDIA.model;

import java.sql.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="purchase_history")
public class PurchaseHistory {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="purchase_date")
    private Date purchaseDate;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName="id")
    @JsonBackReference(value="user-purchasehistory")
    private User user;

    @ManyToMany(cascade = {CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(
        name = "purchasehistory_cart",
        joinColumns = @JoinColumn(name = "purchasehistory_id"),
        inverseJoinColumns = @JoinColumn(name = "cart_id")
    )
    private List<Cart> carts;
    
    @ManyToOne
    @JoinColumn(
            name = "purchasehistory_order",
            referencedColumnName = "id"
        )
    private Order orders;
}
