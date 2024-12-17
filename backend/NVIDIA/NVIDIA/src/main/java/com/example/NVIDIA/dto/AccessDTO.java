package com.example.NVIDIA.dto;
import com.example.NVIDIA.model.Decentralization;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccessDTO {
	   private String roleName;
	   private boolean status;
	   private Decentralization decentralizations;
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Decentralization getDecentralizations() {
		return decentralizations;
	}
	public void setDecentralizations(Decentralization decentralizations) {
		this.decentralizations = decentralizations;
	}
}
