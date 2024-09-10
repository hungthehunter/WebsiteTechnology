package com.example.NVIDIA;

import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.NVIDIA.model.Address;
import com.example.NVIDIA.model.Decentralization;
import com.example.NVIDIA.model.Role;
import com.example.NVIDIA.repository.AddressRepository;
import com.example.NVIDIA.repository.DecentralizationRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.model.User;

@SpringBootApplication
public class NvidiaApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private DecentralizationRepository decentralizationRepository;
    
    @Autowired
    private AddressRepository addressRepository;

    public static void main(String[] args) {
        SpringApplication.run(NvidiaApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        User adminAccount = userRepository.findByRole(Role.Admin);
        if (adminAccount == null) {
            // Create new user
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setFullname("admin");
            user.setMobile("123456");
            user.setRole(Role.Admin);
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            user.setDateofbirth(new SimpleDateFormat("yyyy-MM-dd").parse("1990-01-01"));

            // Fetch decentralization
            Decentralization decentralization = decentralizationRepository.findById(1L).orElse(null); 
            user.setDecentralization(decentralization);

            // Save user first to get the ID
            user = userRepository.save(user);

            // Create and link addresses
            Address address1 = new Address(1L, "123", "Main St", "Ward 1", "District 1", "City 1", "Country 1");
            Address address2 = new Address(2L, "456", "Second St", "Ward 2", "District 2", "City 2", "Country 2");

            // Save addresses
            address1 = addressRepository.save(address1);
            address2 = addressRepository.save(address2);

            // Add addresses to the user and save the user again
            user.setAddresses(List.of(address1, address2));
            userRepository.save(user); 
        }
    }
}
