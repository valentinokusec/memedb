package com.memedb.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.memedb.domains.Tag;
import com.memedb.domains.User;
import com.memedb.forms.HelloMessage;
import com.memedb.forms.SearchData;
import com.memedb.services.TagService;
import com.memedb.services.UserService;



@Controller
public class SocketController {

	@Autowired
	TagService tagservice;

	@Autowired
	UserService userservice;

	@MessageMapping("/searchtag/{id}")
	@SendTo("/topic/main/{id}")
	public HelloMessage greeting(@DestinationVariable String id, SearchData message ) throws Exception {
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		String name = auth.getName();
		User user = userservice.findByUserName("tino");
		List<String> lists= new ArrayList<String>();
		List<Tag> list=tagservice.findAllByNameIgnoreCaseContainingAndUser(message.getData(), user);
		for (int i = 0; i < list.size(); i++) {
			lists.add(list.get(i).getName());
		}
		return new HelloMessage(lists);
	}

}
