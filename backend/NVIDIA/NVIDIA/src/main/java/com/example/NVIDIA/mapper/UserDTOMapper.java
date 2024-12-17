package com.example.NVIDIA.mapper;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import com.example.NVIDIA.dto.BasicAddressDTO;
import com.example.NVIDIA.dto.UserDTO;
import com.example.NVIDIA.model.User;

@Component
public class UserDTOMapper implements Function<User, UserDTO> {

    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
            user.getId(),
            user.getFullname(),
            user.getMobile(),
            user.getEmail(),
            user.getPassword(),
            user.getDateofbirth(),
            user.isStatus(),
            user.getSalary(),
            user.getRole(),
            user.getDecentralization(),
            user.getAddresses().stream()
                 .map(address -> new BasicAddressDTO(
                     address.getId(),
                     address.getHouseNumber(),
                     address.getStreet(),
                     address.getWard(),
                     address.getDistrict(),
                     address.getCity(),
                     address.getCountry(),
                     address.isStatus()
                 ))
                 .collect(Collectors.toList())
        );
    }
}



