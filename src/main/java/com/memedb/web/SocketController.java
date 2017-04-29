package com.memedb.web;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.memedb.services.TagService;



@Controller
public class SocketController {

	@Autowired
	TagService tagservice;

	

	@MessageMapping("/comment/{id}")
	@SendTo("/topic/greetings/{id}")
	public Greeting greeting(@DestinationVariable String id, HelloMessage message) throws Exception {

		
		return new Greeting(message.getName(), comment.getId(), comment.getReply(), message.getId(), user.getId(),
				user.getSummoner().getImage(), user.getSummoner().getName(), counter, not.toString());
	}

}
