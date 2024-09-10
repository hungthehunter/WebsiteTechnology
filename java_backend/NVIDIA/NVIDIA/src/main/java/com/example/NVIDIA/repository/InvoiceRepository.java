package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.NVIDIA.model.Invoice;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Long>{

}
