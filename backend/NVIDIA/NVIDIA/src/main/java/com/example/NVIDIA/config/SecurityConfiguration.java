package com.example.NVIDIA.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.NVIDIA.service.UserService;

import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
	
	
	private final JWTAuthenticationFilter jwtAuthenticationFilter;
	private final UserService userService;
	
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		http.csrf(AbstractHttpConfigurer::disable)
		.authorizeHttpRequests(request-> 
		request.requestMatchers("/swagger-ui/**","/api/v1/auth/**").permitAll()
				
//				 Mở lại nếu set up gần hết
//				.requestMatchers("/api/v1/admin").hasAnyAuthority(Role.Admin.name())
//				.requestMatchers("/api/v1/user").hasAnyAuthority(Role.User.name())
				
				//Admin
				.requestMatchers(HttpMethod.POST,"/api/v1/admin").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/v1/admin/listUsers").permitAll()// List toàn bộ User , Employee , Shipper và Admin
				.requestMatchers(HttpMethod.GET,"/api/v1/admin/{id}").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/v1/admin/listCustomers").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/v1/admin/listEmployees").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/v1/admin/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/v1/admin/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/v1/admin/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/v1/admin/update/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/v1/admin/address/{id}").permitAll()
				
				//Cart
				.requestMatchers(HttpMethod.POST,"/api/carts").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/carts").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/carts/{id}").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/carts/user/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/carts/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/carts/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/carts/delete/{id}").permitAll()
				
				//CartItem
				.requestMatchers(HttpMethod.POST,"/api/items").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/items").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/items/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/items/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/items/{id}").permitAll()
				
				
				//Category
				.requestMatchers(HttpMethod.POST,"/api/categories").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/categories").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/categories/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/categories/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/categories/{id}").permitAll()
				
				//Contact
				.requestMatchers(HttpMethod.POST,"/api/contacts").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/contacts").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/contacts/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/contacts/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/contacts/{id}").permitAll()
				
				//Invoice
				.requestMatchers(HttpMethod.POST,"/api/invoices").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/invoices").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/invoices/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/invoices/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/invoices/{id}").permitAll()
				
				//Manufacturer
				.requestMatchers(HttpMethod.POST,"/api/manufacturers").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/manufacturers").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/manufacturers/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/manufacturers/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/manufacturers/{id}").permitAll()
				
				//Order
				.requestMatchers(HttpMethod.POST,"/api/orders").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/orders").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/orders/{id}").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/orders/userId/{userId}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/orders/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/orders/{id}").permitAll()
				
				//OrderDetail
				.requestMatchers(HttpMethod.POST,"/api/orderDetails").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/orderDetails").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/orderDetails/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/orderDetails/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/orderDetails/{id}").permitAll()
				
				//Product
				.requestMatchers(HttpMethod.POST,"/api/products").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/products").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/products/manufacturer/{id}").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/products/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/products/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/products/{id}").permitAll()
				
				//ProductImage
				.requestMatchers(HttpMethod.POST,"/api/ProductImageImages").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/ProductImageImages").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/ProductImageImages/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/ProductImageImages/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/ProductImageImages/{id}").permitAll()
				
				//Promotion
				.requestMatchers(HttpMethod.POST,"/api/promotions").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/promotions").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/promotions/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/promotions/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/promotions/{id}").permitAll()
				
				//PurchaseHistory
				.requestMatchers(HttpMethod.POST,"/api/purchaseHistories").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/purchaseHistories").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/purchaseHistories/{id}").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/purchaseHistories/user/{userId}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/purchaseHistories/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/purchaseHistories/{id}").permitAll()
				
				//Payment
				.requestMatchers(HttpMethod.POST,"/api/payments").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/payments").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/payments/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/payments/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/payments/{id}").permitAll()
				
				//Address
				.requestMatchers(HttpMethod.POST,"/api/addresses").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/addresses").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/addresses/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/addresses/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/addresses/{id}").permitAll()
				
				//Function
				.requestMatchers(HttpMethod.POST,"/api/functions").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/functions").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/functions/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/functions/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/functions/{id}").permitAll()
				
				//Role
				.requestMatchers(HttpMethod.POST,"/api/roles").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/roles").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/roles/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/roles/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/roles/{id}").permitAll()
				
				//Decentralization
				.requestMatchers(HttpMethod.POST,"/api/decentralizations").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/decentralizations").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/decentralizations/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/decentralizations/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/decentralizations/{id}").permitAll()
				
				//Access
				.requestMatchers(HttpMethod.POST,"/api/accesses").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/accesses").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/accesses/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/accesses/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/accesses/{id}").permitAll()
		
				//Image
				.requestMatchers(HttpMethod.POST,"/api/image").permitAll()
				.requestMatchers(HttpMethod.POST,"/api/image/fileSystem").permitAll()
				.requestMatchers(HttpMethod.POST,"/api/image/fileSystem/uploadMultiple").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/image/fileSystem/downloadMultiple").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/image/{fileName}").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/image/fileSystem/{fileName}").permitAll()
				
				//Review
				.requestMatchers(HttpMethod.POST,"/api/reviews").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/reviews").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/reviews/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE,"/api/reviews/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT,"/api/reviews/{id}").permitAll()
				
				// Import
				.requestMatchers(HttpMethod.POST, "/api/imports").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/imports").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/imports/{id}").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/imports/product/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT, "/api/imports/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE, "/api/imports/{id}").permitAll()

				// Export
				.requestMatchers(HttpMethod.POST, "/api/exports").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/exports").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/exports/{id}").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/exports/product/{id}").permitAll()
				.requestMatchers(HttpMethod.PUT, "/api/exports/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE, "/api/exports/{id}").permitAll()
				
				.anyRequest().authenticated())
		
		
		
		
	.sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	.authenticationProvider(authenticationProvider()).addFilterBefore(
			jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class
			);
		
		
		
return http.build();
}
	
	
	
	@Bean
	public AuthenticationProvider authenticationProvider() {
	    DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
	    authenticationProvider.setUserDetailsService(userService.userDetailsService());
	    authenticationProvider.setPasswordEncoder(passwordEncoder());
	    return authenticationProvider; // Return the created object, not the method call
	}

	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	@Bean
	public AuthenticationManager authenticationMangager(AuthenticationConfiguration config) throws Exception{
return config.getAuthenticationManager();
	}


}


