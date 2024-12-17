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
		return DecentralizationRepository.findByIdWithStatus(id).orElseThrow(()->new RuntimeException("Cannot found Decentralization"));
	}

	@Override
	public List<Decentralization> getAll() {
		return DecentralizationRepository.findAllWithStatus();
	}

	@Override
	public DecentralizationDTO create(DecentralizationDTO decentralization) {
	    // Tạo mới Access từ roleId
	    Access access = decentralization.getAccess();
	    access.setRoleName(decentralization.getAccess().getRoleName());
	    access.setStatus(true);
	    access = AccessRepository.save(access);

	    // Tìm các Function từ functionNames trong DTO
	    List<Function> functions = decentralization.getFunctionIds().stream()
	        .map(functionDTO -> functionRepository.findByFunctionName(functionDTO.getFunctionName())
	            .orElseThrow(() -> new RuntimeException("Function not found"))
	        )
	        .collect(Collectors.toList());

	    Decentralization new_decentralization = new Decentralization();
	    new_decentralization.setAccess(access);  
	    new_decentralization.setFunctionIds(functions);  
	    new_decentralization.setStatus(true);

	    // Lưu đối tượng Decentralization với các Function đã được gán
	    new_decentralization = decentralizationRepository.save(new_decentralization);

	    // Chuyển đổi Decentralization thành DecentralizationDTO
	    return DecentralizationDTOMapper.apply(new_decentralization);
	}

	
	@Override
	public DecentralizationDTO update(Long id, DecentralizationDTO decentralizationDTO) {
	    // Tìm kiếm Decentralization theo id
	    Decentralization decentralization = decentralizationRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Decentralization not found"));

	    // Cập nhật Access đã có từ DTO
	    Access access = decentralization.getAccess(); // Lấy Access hiện tại
	    access.setRoleName(decentralizationDTO.getAccess().getRoleName()); // Cập nhật roleName
	    access.setStatus(true);
	    access = AccessRepository.save(access); // Lưu Access đã cập nhật

	    // Cập nhật danh sách Function từ functionNames trong DTO
	    List<Function> functions = decentralizationDTO.getFunctionIds().stream()
	        .map(functionDTO -> functionRepository.findByFunctionName(functionDTO.getFunctionName())
	            .orElseThrow(() -> new RuntimeException("Function not found"))
	        )
	        .collect(Collectors.toList());

	    // Cập nhật đối tượng Decentralization với Access và Function mới
	    decentralization.setFunctionIds(functions); // Cập nhật danh sách Functions
        decentralization.setStatus(true);
	    // Lưu đối tượng Decentralization đã cập nhật và nhận đối tượng đã lưu
	    decentralization = decentralizationRepository.save(decentralization);

	    // Chuyển đổi Decentralization thành DecentralizationDTO và trả về
	    return DecentralizationDTOMapper.apply(decentralization); // Sử dụng mapper để chuyển đổi đối tượng
	}

	@Override
	public void delete(Long id) {
	    // Tìm thực thể Decentralization
	    Decentralization decentralization = decentralizationRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Decentralization not found"));
	    
	    decentralization.setStatus(false);

	    // Xóa thực thể Decentralization
	    decentralizationRepository.delete(decentralization);
	}



}
