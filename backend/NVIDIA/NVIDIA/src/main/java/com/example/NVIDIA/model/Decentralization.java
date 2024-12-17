package com.example.NVIDIA.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@Table(name="Decentralization")

public class Decentralization {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	
	@OneToOne
	@JsonManagedReference(value="decentralization-access")
	@JoinColumn(name="access_id")
	private Access access;

	@ManyToMany
    @JoinTable(
        name = "role_function",
        joinColumns = @JoinColumn(name = "access_id"),
        inverseJoinColumns = @JoinColumn(name = "function_id")
    )
    private List<Function> functionIds;
	
	private boolean status;
}


