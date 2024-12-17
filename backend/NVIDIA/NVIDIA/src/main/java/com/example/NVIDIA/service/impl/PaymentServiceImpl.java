package com.example.NVIDIA.service.impl;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.NVIDIA.dto.PaymentDTO;
import com.example.NVIDIA.mapper.PaymentDTOMapper;
import com.example.NVIDIA.model.CreditCardPayment;
import com.example.NVIDIA.model.Order;
import com.example.NVIDIA.model.Payment;
import com.example.NVIDIA.model.PaymentMethod;
import com.example.NVIDIA.repository.OrderRepository;
import com.example.NVIDIA.repository.PaymentRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService{

	
	@Autowired
	private PaymentRepository paymentRepository;
	
	@Autowired
	private PaymentDTOMapper paymentDTOMapper;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OrderRepository orderRepository; 
	
	
	@Override
	public PaymentDTO getById(Long id) {
		Payment payment =paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find your payment"));
		return paymentDTOMapper.apply(payment);
	}

	@Override
	public List<PaymentDTO> getAll() {
		List<Payment> payment = paymentRepository.findAll(); 
		return payment.stream().map(paymentDTOMapper).collect(Collectors.toList());
	}

	@Override
	public Payment create(Payment PaymentDTO) {
		Payment payment=new Payment();
	payment.setPayment_date(PaymentDTO.getPayment_date());
	payment.setPayment_status(PaymentDTO.getPayment_status());
	payment.setTotal_price(PaymentDTO.getTotal_price());
    payment.setUser(PaymentDTO.getUser());
    payment.setPayment_method(PaymentDTO.getPayment_method());
    
    if (payment.getPayment_method() == PaymentMethod.CREDIT_CARD) {
        CreditCardPayment creditCardPayment = payment.getCreditCardPayment();
        if (creditCardPayment == null) {
            creditCardPayment = new CreditCardPayment();
            creditCardPayment.setPayment(payment);
        }
        creditCardPayment.setCardNumber(PaymentDTO.getCreditCardPayment().getCardNumber());
        creditCardPayment.setCardHolderName(PaymentDTO.getCreditCardPayment().getCardHolderName());
        creditCardPayment.setCardExpiryDate(PaymentDTO.getCreditCardPayment().getCardExpiryDate());
        creditCardPayment.setCvv(PaymentDTO.getCreditCardPayment().getCvv());
        payment.setCreditCardPayment(creditCardPayment);
    } else {       
        payment.setCreditCardPayment(null);
    }

    List<Order> orders = PaymentDTO.getOrder().stream()
    .map(orderDTO-> orderRepository.findById(orderDTO.getId())
    .orElseThrow(() -> new RuntimeException("Cannot find order")))
    .collect(Collectors.toList());

    payment.setOrder(orders);
    
    Payment savePayment=paymentRepository.save(payment);
		
		return savePayment;
	}

	@Override
	public Payment update(Long id, Payment PaymentDTO) {
		Payment payment=paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find payment"));
		payment.setPayment_date(PaymentDTO.getPayment_date());
		if (payment.getPayment_method() == PaymentMethod.CREDIT_CARD) {
	        CreditCardPayment creditCardPayment = payment.getCreditCardPayment();
	        if (creditCardPayment == null) {
	            creditCardPayment = new CreditCardPayment();
	            creditCardPayment.setPayment(payment);
	        }
	        creditCardPayment.setCardNumber(PaymentDTO.getCreditCardPayment().getCardNumber());
	        creditCardPayment.setCardHolderName(PaymentDTO.getCreditCardPayment().getCardHolderName());
	        creditCardPayment.setCardExpiryDate(PaymentDTO.getCreditCardPayment().getCardExpiryDate());
	        creditCardPayment.setCvv(PaymentDTO.getCreditCardPayment().getCvv());

	        payment.setCreditCardPayment(creditCardPayment); 
	    } else {
	        payment.setCreditCardPayment(null);
	    }
		payment.setPayment_status(PaymentDTO.getPayment_status());
		payment.setTotal_price(PaymentDTO.getTotal_price());
	    payment.setUser(PaymentDTO.getUser());  
	    payment.setOrder(PaymentDTO.getOrder());
		Payment savePayment=paymentRepository.save(payment);
		return savePayment;
	}

	@Override
	public void delete(Long id) {
		paymentRepository.deleteById(id);
		
	}

}
