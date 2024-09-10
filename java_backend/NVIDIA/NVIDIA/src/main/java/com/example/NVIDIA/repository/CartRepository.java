package com.example.NVIDIA.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.NVIDIA.model.Cart;

@Repository
@EnableJpaRepositories
public interface CartRepository extends JpaRepository<Cart ,Long>{
//    Optional<Cart> findByUserId(Long userId);
//    Cart findByUser(User user);

    @Query("SELECT c FROM Cart c WHERE c.status = true")
    List<Cart> findAll();

    List<Cart> findAllByUserId(Long userId);
    
    @Query("SELECT c FROM Cart c JOIN FETCH c.products  WHERE c.user.id = :userId and c.status=false")
    List<Cart> findAllCartsByUserIdWithProducts(@Param("userId") Long userId);
    
    @Query("SELECT DISTINCT c FROM Cart c JOIN FETCH c.products WHERE c.status=false")
    List<Cart> findAllCartHasHandle();


}
