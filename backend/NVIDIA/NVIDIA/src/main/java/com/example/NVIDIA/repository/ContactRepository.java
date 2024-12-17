package com.example.NVIDIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.NVIDIA.model.Contact;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Long>{

}
