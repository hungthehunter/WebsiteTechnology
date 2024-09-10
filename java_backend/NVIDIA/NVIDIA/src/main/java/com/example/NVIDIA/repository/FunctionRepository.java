package com.example.NVIDIA.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.NVIDIA.model.Function;

@Repository
public interface FunctionRepository extends JpaRepository<Function,Long>{
	
	@Query(value = "SELECT * FROM function_role f WHERE f.function_name = :functionName", nativeQuery = true)
	Optional<Function> findByFunctionName(String functionName);

}
