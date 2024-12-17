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
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="function_role")
public class Function {

@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;

private boolean status;

@Column(name="functionName",length=255)
private String functionName;

}