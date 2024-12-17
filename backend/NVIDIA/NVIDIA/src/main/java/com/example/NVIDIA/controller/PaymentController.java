package com.example.NVIDIA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.example.NVIDIA.dto.PaymentDTO;
import com.example.NVIDIA.model.Payment;
import com.example.NVIDIA.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    
    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPaymentById(@PathVariable Long id) {
        PaymentDTO PaymentDTO = paymentService.getById(id);
        return ResponseEntity.ok(PaymentDTO);
    }

    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllCategories() {
        List<PaymentDTO> categories = paymentService.getAll();
        return ResponseEntity.ok(categories);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Payment> createPayment(@RequestPart("payment") Payment PaymentDTO) {
        Payment createdPayment = paymentService.create(PaymentDTO);
        return ResponseEntity.ok(createdPayment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestPart("payment") Payment PaymentDTO) {
        Payment updatedPayment = paymentService.update(id, PaymentDTO);
        return ResponseEntity.ok(updatedPayment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
