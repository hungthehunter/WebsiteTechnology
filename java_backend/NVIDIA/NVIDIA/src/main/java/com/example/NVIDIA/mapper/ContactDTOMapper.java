package com.example.NVIDIA.mapper;

import java.util.function.Function;

import com.example.NVIDIA.dto.ContactDTO;
import com.example.NVIDIA.model.Contact;
import org.springframework.stereotype.Component;
@Component
public class ContactDTOMapper implements Function<Contact,ContactDTO>{

	@Override
	public ContactDTO apply(Contact contact) {
return new ContactDTO(
			contact.getContactEmail(),
			contact.getContactDate(),
			contact.getReplyDate(),
			contact.getContactContent(),
			contact.getReplyContent(),
			contact.getStatus(),
			contact.getResponder()
);
	}

}
