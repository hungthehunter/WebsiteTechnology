package com.example.NVIDIA.dto;
import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionDTO {
	private String promotionName;
	private String description;
	private Double discountPercentage;
	private Date startDate;
	private Date end_date;
	private boolean status;
}
