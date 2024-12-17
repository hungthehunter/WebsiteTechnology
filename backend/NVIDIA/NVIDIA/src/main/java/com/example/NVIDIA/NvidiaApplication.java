package com.example.NVIDIA;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;



import com.example.NVIDIA.model.Access;
import com.example.NVIDIA.model.Address;
import com.example.NVIDIA.model.Decentralization;
import com.example.NVIDIA.model.Function;
import com.example.NVIDIA.model.Role;
import com.example.NVIDIA.repository.AccessRepository;
import com.example.NVIDIA.repository.AddressRepository;
import com.example.NVIDIA.repository.DecentralizationRepository;
import com.example.NVIDIA.repository.FunctionRepository;
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
    
    @Autowired
    private AccessRepository accessRepository;
    
    @Autowired
    private FunctionRepository functionRepository;

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
            user.setStatus(true);
            user.setDateofbirth(new SimpleDateFormat("yyyy-MM-dd").parse("1990-01-01"));

            if (functionRepository.count() == 0) {
                functionRepository.saveAll(List.of(
                    new Function(1L, true, "View Customer List"),
                    new Function(2L, true, "Create Customer"),
                    new Function(3L, true, "Edit Customer"),
                    new Function(4L, true, "Delete Customer"),
                    new Function(5L, true, "View Product List"),
                    new Function(6L, true, "Create Product"),
                    new Function(7L, true, "Edit Product"),
                    new Function(8L, true, "Delete Product"),
                    new Function(9L, true, "View Access List"),
                    new Function(10L, true, "Create Access"),
                    new Function(11L, true, "Edit Access"),
                    new Function(12L, true, "Delete Access"),
                    new Function(13L, true, "View Staff List"),
                    new Function(14L, true, "Create Staff"),
                    new Function(15L, true, "Edit Staff"),
                    new Function(16L, true, "View Order List"),
                    new Function(17L, true, "Create Order"),
                    new Function(18L, true, "Edit Order"),
                    new Function(19L, true, "Delete Order"),
                    new Function(20L, true, "View Manufacturer List"),
                    new Function(21L, true, "Create Manufacturer"),
                    new Function(22L, true, "Edit Manufacturer"),
                    new Function(23L, true, "Delete Manufacturer"),
                    new Function(24L, true, "View Category List"),
                    new Function(25L, true, "Create Category"),
                    new Function(26L, true, "Edit Category"),
                    new Function(27L, true, "Delete Category"),
                    new Function(28L, true, "View Dashboard"),
                    new Function(29L, true, "View Chart"),
                    new Function(30L, true, "View Account Address"),
                    new Function(31L, true, "Create Account Address"),
                    new Function(32L, true, "Edit Account Address"),
                    new Function(33L, true, "Delete Account Address"),
                    new Function(34L, true, "View Account Detail"),
                    new Function(35L, true, "Create Account Detail"),
                    new Function(36L, true, "Edit Account Detail"),
                    new Function(37L, true, "Delete Account Detail"),
                    new Function(38L, true, "View Account Order"),
                    new Function(39L, true, "Create Account Order"),
                    new Function(40L, true, "Edit Account Order"),
                    new Function(41L, true, "Delete Account Order"),
                    new Function(42L, true, "View Account Product History"),
                    new Function(43L, true, "Create Account Product History"),
                    new Function(44L, true, "Edit Account Product History"),
                    new Function(45L, true, "Delete Account Product History"),
                    new Function(46L, true, "View Import List"),
                    new Function(47L, true, "Create Import"),
                    new Function(48L, true, "Edit Import"),
                    new Function(49L, true, "View Export List"),
                    new Function(50L, true, "Create Export"),
                    new Function(51L, true, "Edit Export"),
                    new Function(52L,true ,"View Promotion List"),
                    new Function(53L,true ,"Create Promotion"),
                    new Function(54L,true ,"Edit Promotion"),
                    new Function(55L,true ,"Delete Promotion")
                ));
            }

            // Initialize Access data if not present
            Optional<Access> accessOpt = accessRepository.findById(1L);
            if (accessOpt.isEmpty()) {
                Access access = new Access(1L, "All Access", true, null);
                access = accessRepository.save(access);
                
                // Create Decentralization
                Decentralization decentralization = new Decentralization(1L, access, functionRepository.findAll(),true);
                decentralizationRepository.save(decentralization);
            }
            
            Optional<Access> accessUser = accessRepository.findById(2L);
            if (accessUser.isEmpty()) {
                // Create new Access
                Access access = new Access(2L, "No Access", true, null);
                access = accessRepository.save(access); 
                
                Decentralization decentralization = new Decentralization(2L, access, null, true);
                decentralizationRepository.save(decentralization);
            }
            
            Optional<Access> accessEmployees = accessRepository.findById(3L);
            if (accessEmployees.isEmpty()) {
                // Tạo đối tượng Access mới
                Access access = new Access(3L, "Employee Access", true, null);

                // Tạo danh sách các Function
                List<Function> functions = new ArrayList<>();
                
                functions.add(new Function(1L, true, "View Customer List"));
                functions.add(new Function(2L, true, "Create Customer"));
                functions.add( new Function(3L, true, "Edit Customer"));
                functions.add(new Function(4L, true, "Delete Customer"));
                functions.add(new Function(5L, true, "View Product List"));
                functions.add(new Function(16L, true, "View Order List"));
                functions.add( new Function(17L, true, "Create Order"));
                functions.add( new Function(18L, true, "Edit Order"));
                functions.add(new Function(19L, true, "Delete Order"));
                // Lưu Access vào cơ sở dữ liệu
                access = accessRepository.save(access);

                // Liên kết với Decentralization (nếu cần thiết)
                Decentralization decentralization = new Decentralization(3L, access, functions,true); // Giả sử `null` là một đối tượng hợp lệ ở đây
                decentralizationRepository.save(decentralization);
            }

            // Fetch decentralization
            Decentralization decentralization = decentralizationRepository.findById(1L).orElse(null);
            user.setDecentralization(decentralization);

            // Save user first to get the ID
            user = userRepository.save(user);

            // Create and link addresses
            Address address1 = new Address(1L, "123", "Main St", "Ward 1", "District 1", "City 1", "Country 1",true,user);
            Address address2 = new Address(2L, "456", "Second St", "Ward 2", "District 2", "City 2", "Country 2",true,user);

            // Save addresses
            address1 = addressRepository.save(address1);
            address2 = addressRepository.save(address2);

            // Add addresses to the user and save the user again
            user.setAddresses(List.of(address1, address2));
            userRepository.save(user); 
        }
    }
}
