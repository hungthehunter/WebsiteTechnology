package com.example.NVIDIA.service.impl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.ManufacturerDTO;
import com.example.NVIDIA.mapper.ManufacturerDTOMapper;
import com.example.NVIDIA.model.Manufacturer;
import com.example.NVIDIA.repository.ManufacturerRepository;
import com.example.NVIDIA.service.ManufacturerService;

@Service
public class ManufacturerServiceImpl implements ManufacturerService {

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Autowired
    private ManufacturerDTOMapper manufacturerDTOMapper;

    @Override
    public Manufacturer getById(Long id) {
        return manufacturerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find manufacturer"));
      
    }

    @Override
    public List<Manufacturer> getAll() {
        return manufacturerRepository.findAll();
    }

    @Override
    public ManufacturerDTO create(ManufacturerDTO manufacturerDTO) {
        Manufacturer manufacturer = new Manufacturer();
        manufacturer.setManufacturerName(manufacturerDTO.getManufacturerName());
        Manufacturer savedManufacturer = manufacturerRepository.save(manufacturer);
        return manufacturerDTOMapper.apply(savedManufacturer);
    }

    @Override
    public ManufacturerDTO update(Long id, ManufacturerDTO manufacturerDTO) {
        Manufacturer manufacturer = manufacturerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find manufacturer"));
        manufacturer.setManufacturerName(manufacturerDTO.getManufacturerName());
        Manufacturer updatedManufacturer = manufacturerRepository.save(manufacturer);
        return manufacturerDTOMapper.apply(updatedManufacturer);
    }

    @Override
    public void delete(Long id) {
        manufacturerRepository.deleteById(id);
    }
}
