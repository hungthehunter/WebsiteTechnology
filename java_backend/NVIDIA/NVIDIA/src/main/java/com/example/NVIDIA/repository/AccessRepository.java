package com.example.NVIDIA.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.NVIDIA.model.Access;

@Repository
public interface AccessRepository extends JpaRepository<Access, Long>{

}
