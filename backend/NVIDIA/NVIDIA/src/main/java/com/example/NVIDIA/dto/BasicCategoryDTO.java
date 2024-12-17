package com.example.NVIDIA.dto;
import com.example.NVIDIA.model.ImageCloud;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicCategoryDTO {
    private Long id;
    private String name;
    private String description; 
    private ImageCloud imageCloud;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public ImageCloud getImageCloud() {
		return imageCloud;
	}
	public void setImageCloud(ImageCloud imageCloud) {
		this.imageCloud = imageCloud;
	}
}
