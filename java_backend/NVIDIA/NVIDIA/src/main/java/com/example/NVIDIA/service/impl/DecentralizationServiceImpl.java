package com.example.NVIDIA.service.impl;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.DecentralizationDTO;
import com.example.NVIDIA.mapper.DecentralizationDTOMapper;
import com.example.NVIDIA.model.Decentralization;
import com.example.NVIDIA.model.Function;
import com.example.NVIDIA.model.Access;
import com.example.NVIDIA.repository.DecentralizationRepository;
import com.example.NVIDIA.repository.FunctionRepository;
import com.example.NVIDIA.repository.AccessRepository;
import com.example.NVIDIA.service.DecentralizationService;
import jakarta.transaction.Transactional;

@Service
public class DecentralizationServiceImpl implements DecentralizationService{
	@Autowired
	private DecentralizationRepository DecentralizationRepository;
	
	@Autowired
	private DecentralizationDTOMapper DecentralizationDTOMapper;
	
	@Autowired
	private DecentralizationRepository decentralizationRepository;
	
	@Autowired
	private AccessRepository AccessRepository;
	
	@Autowired
	private FunctionRepository functionRepository;
	
	@Override
	public Decentralization getById(Long id) {
		return DecentralizationRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found Decentralization"));
	}

	@Override
	public List<Decentralization> getAll() {
		return DecentralizationRepository.findAll();
	}

	@Override
	public DecentralizationDTO create(DecentralizationDTO decentralizationDTO) {
	
		 // Tạo mới Access từ roleId
	    Access Access = new Access();
	    Access.setRoleName(decentralizationDTO.getAccess().getRoleName());
	    Access = AccessRepository.save(Access);

	    // Tìm các Function từ functionNames trong DTO
	    List<Function> functions = decentralizationDTO.getFunctionIds().stream()
	        .map(functionDTO -> functionRepository.findByFunctionName(functionDTO.getFunctionName())
	            .orElseThrow(() -> new RuntimeException("Function not found"))
	        )
	        .collect(Collectors.toList());

	    // Tạo và lưu Decentralization
	    Decentralization decentralization = new Decentralization();
	    decentralization.setAccess(Access);
	    decentralization.setFunctionIds(functions);
	    decentralization = decentralizationRepository.save(decentralization);

	    // Chuyển đổi Decentralization thành DecentralizationDTO
	    return DecentralizationDTOMapper.apply(decentralization);
	}

	
	@Override
	public DecentralizationDTO update(Long id, DecentralizationDTO decentralizationDTO) {
	    // Tìm kiếm Decentralization theo id
	    Decentralization decentralization = decentralizationRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Decentralization not found"));

	    // Cập nhật Access đã có từ DTO
	    Access access = decentralization.getAccess(); // Lấy Access hiện tại
	    access.setRoleName(decentralizationDTO.getAccess().getRoleName()); // Cập nhật roleName
	    access = AccessRepository.save(access); // Lưu Access đã cập nhật

	    // Cập nhật danh sách Function từ functionNames trong DTO
	    List<Function> functions = decentralizationDTO.getFunctionIds().stream()
	        .map(functionDTO -> functionRepository.findByFunctionName(functionDTO.getFunctionName())
	            .orElseThrow(() -> new RuntimeException("Function not found"))
	        )
	        .collect(Collectors.toList());

	    // Cập nhật đối tượng Decentralization với Access và Function mới
	    decentralization.setFunctionIds(functions); // Cập nhật danh sách Functions

	    // Lưu đối tượng Decentralization đã cập nhật và nhận đối tượng đã lưu
	    decentralization = decentralizationRepository.save(decentralization);

	    // Chuyển đổi Decentralization thành DecentralizationDTO và trả về
	    return DecentralizationDTOMapper.apply(decentralization); // Sử dụng mapper để chuyển đổi đối tượng
	}




	@Transactional
	@Override
	public void delete(Long id) {
	    // Tìm thực thể Decentralization
	    Decentralization decentralization = decentralizationRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Decentralization not found"));
	    
	    // Xóa Access trước khi xóa Decentralization
	    Long accessId = decentralization.getAccess().getId();
	    AccessRepository.deleteById(accessId);

	    // Xóa thực thể Decentralization
	    decentralizationRepository.delete(decentralization);
	}



}
