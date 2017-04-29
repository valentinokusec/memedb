package com.memedb.web;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.memedb.domains.Meme;
import com.memedb.domains.Tag;
import com.memedb.domains.User;
import com.memedb.forms.MeMeForm;
import com.memedb.services.UserService;

@Controller
public class HelloController {

	@Autowired
	UserService userservice;

	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(HttpServletRequest request) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		if (name.contains("anonymousUser")) {
			return "login";
		} else {
			return "redirect:/loginSuccess";
		}

	}

	@RequestMapping("/")
	public String index(Model model) {

		model.addAttribute("User", new User());
		model.addAttribute("message", "");
		return "index";
	}

	@PostMapping("/newuser")
	public String addUser(@ModelAttribute User User, Model model) {

		if (userservice.findByUserName(User.getUserName()) != null) {
			model.addAttribute("userexist", true);
			model.addAttribute("CreateUser", User);
			return "register";
		}

		userservice.create(User);

		return "redirect:main/";

	}

	@RequestMapping("/main")
	public String main(Model model) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = userservice.findByUserName(name);
		model.addAttribute("User", user);
		model.addAttribute("MemeForm", new MeMeForm());
		model.addAttribute("message", "");
		return "main";
	}

	@PostMapping("/newmeme")
	public String newMeMe(@ModelAttribute MeMeForm MeMeForm, Model model) {

		Meme meme = new Meme();
		meme.setName(MeMeForm.getHeader());
		List<Tag> tagList = new ArrayList<Tag>();
		for (String tags : MeMeForm.getTags()) {
			Tag tag = new Tag();
			tag.setName(tags);
			tagList.add(tag);
		}
		meme.setTags(tagList);
		String FILENAME = "D:\\test\\filename.png";
		BufferedWriter bw = null;
		FileWriter fw = null;
		try {

			
		    FileOutputStream fileOuputStream = new FileOutputStream(FILENAME); 
		    fileOuputStream.write(MeMeForm.getFile());
		
			fileOuputStream.close();
			System.out.println("Done");

		} catch (IOException e) {

			e.printStackTrace();

		} finally {

		}
		return "redirect:main";

	}
}
