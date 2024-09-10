package com.example.NVIDIA.model;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Table(name="users")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class User implements UserDetails{
  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false)
  private String fullname;
  @Column(nullable = false)
  private String mobile;
  @Column(nullable = false)
  private String email;
  @Column(nullable = false)
  private String password;
  @Column(name="dateofbirth")
  private Date dateofbirth;
  
  @Enumerated(EnumType.STRING)
  private Role role;

  // Phần không cần xóa
  
  @ManyToOne
  @JoinColumn(name = "decentralization_id")
  private Decentralization decentralization;
  
  // Phần tự động xóa 
  
  /*--  PURCHASE HISTORY --*/
  
  @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference(value="user-purchasehistory")
  private List<PurchaseHistory> purchase_history;
  
  /*-------  PAYMENT ------*/
  @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference(value="user-payment")
  private List<Payment> payment;
  
  /*--------  CART -------*/
  @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference(value="user-cart")
  private List<Cart> cart;

  /*--------  ADDRESS -------*/
  @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "address_id")
  private List<Address> addresses;

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
	// TODO Auto-generated method stub
	return List.of(new SimpleGrantedAuthority(role.name()));
}

@Override
public boolean isAccountNonExpired() {
	// TODO Auto-generated method stub
	return true;
}
@Override
public boolean isAccountNonLocked() {
	// TODO Auto-generated method stub
	return true;
}
@Override
public boolean isCredentialsNonExpired() {
	// TODO Auto-generated method stub
	return true;
}
@Override
public boolean isEnabled() {
	// TODO Auto-generated method stub
	return true;
}
@Override
public String getUsername() {
	// TODO Auto-generated method stub
	return email;
}



}