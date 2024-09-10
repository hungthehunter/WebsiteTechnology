package com.example.NVIDIA.service.impl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.NVIDIA.dto.ContactDTO;
import com.example.NVIDIA.mapper.ContactDTOMapper;
import com.example.NVIDIA.repository.ContactRepository;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.ContactService;
import com.example.NVIDIA.model.Contact;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService{

	@Autowired 
	private ContactRepository contactRepository;
	
	@Autowired
	private ContactDTOMapper contactDTOMapper;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Contact getById(Long id) {
		return contactRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found contact"));
		
	}

	@Override
	public List<Contact> getALl() {
		
		return contactRepository.findAll();
	}

	@Override
	public ContactDTO create(ContactDTO contactDTO) {
		Contact contact=new Contact();
		contact.setContactContent(contactDTO.getContactContent());
		contact.setContactDate(contactDTO.getContactDate());
		contact.setContactEmail(contactDTO.getContactEmail());
		contact.setReplyContent(contactDTO.getReplyContent());
		contact.setReplyDate(contactDTO.getReplyDate());
		contact.setResponder(userRepository.findById(contactDTO.getResponder().getId()).orElseThrow(()->new RuntimeException("Cannot found user")));
		contact.setStatus(contactDTO.getStatus());
		Contact saveContact=contactRepository.save(contact);
		return contactDTOMapper.apply(saveContact);
	}

	@Override
	public ContactDTO update(Long id, ContactDTO contactDTO) {
		Contact contact=contactRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot found contact"));
		contact.setContactContent(contactDTO.getContactContent());
		contact.setContactDate(contactDTO.getContactDate());
		contact.setContactEmail(contactDTO.getContactEmail());
		contact.setReplyContent(contactDTO.getReplyContent());
		contact.setReplyDate(contactDTO.getReplyDate());
		contact.setResponder(userRepository.findById(contactDTO.getResponder().getId()).orElseThrow(()->new RuntimeException("Cannot found user")));
		contact.setStatus(contactDTO.getStatus());
		Contact updateContact=contactRepository.save(contact);
		return contactDTOMapper.apply(updateContact);
	}

	@Override
	public void delete(Long id) {
contactRepository.deleteById(id);
		
	}

}
