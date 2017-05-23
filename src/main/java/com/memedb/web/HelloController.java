package com.memedb.web;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.memedb.domains.Meme;
import com.memedb.domains.Tag;
import com.memedb.domains.User;
import com.memedb.forms.MeMeForm;
import com.memedb.services.MemeService;
import com.memedb.services.TagService;
import com.memedb.services.UserService;
import com.memedb.storage.StorageService;

@Controller
public class HelloController {

	@Autowired
	UserService userservice;
	 @Autowired
	 StorageService storageService;
	 @Autowired
	 MemeService memeservice;

	 @Autowired
	 TagService tagservice;
  
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(HttpServletRequest request) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		if (name.contains("anonymousUser")) {
			return "login";
		} else {
			return "redirect:/main";
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
		Page<Meme> memes=memeservice.findAllByUser(new PageRequest(0, 10), user);
		model.addAttribute("User", user);
		model.addAttribute("Memes", memes);
		model.addAttribute("Tags", tagservice.findByUser(user));
		model.addAttribute("MemeForm", new MeMeForm());
		model.addAttribute("message", "");
		return "main";
	}
	@RequestMapping("/meme/{name}")
	public String meme(Model model,@PathVariable(value = "name") String namem) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = userservice.findByUserName(name);
		Meme memes=memeservice.findByName(namem);
		model.addAttribute("User", user);
		model.addAttribute("meme", memes);
		model.addAttribute("Tags", tagservice.findByUser(user));
		model.addAttribute("MemeForm", new MeMeForm());
		model.addAttribute("message", "");
		return "meme";
	}
	@PostMapping("/newmeme")
	public String newMeMe(@RequestParam("file") MultipartFile file,  MeMeForm MeMeForm) {

		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = userservice.findByUserName(name);
		Meme meme = new Meme();
		meme.setName(MeMeForm.getHeader());
		List<Tag> tagList = new ArrayList<Tag>();
		
		for (String tags : MeMeForm.getTags()) {
			Tag tag = new Tag();
			tag.setName(tags);
			tagservice.create(tag);
			tag.setUser(user);
			tagList.add(tag);
			
		}
			meme.setDate(new Timestamp(System.currentTimeMillis()));
			meme.setTags(tagList);
			meme.setPath("D:\\test\\"+file.getOriginalFilename());
			storageService.store(file);
			
			List<Meme> memeList = user.getMeme();
			memeList.add(meme);
			user.setMeme(memeList);
			
			meme.setUser(user);
			
			// Create the file on server
		memeservice.create(meme);
		userservice.create(user);

	
		return "redirect:main";

	}
	@PostMapping("/search")
	public String searchTag(@RequestParam("tag") String tags, Model model) {

		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = userservice.findByUserName(name);
		Tag tag=tagservice.findByName(tags);
List<Tag> tagList = new ArrayList<Tag>();
		
	
		
			tagList.add(tag);
			
			
		Page<Meme> memes=memeservice.findAllByTags(new PageRequest(0, 10), tagList);
		model.addAttribute("User", user);
		model.addAttribute("Memes", memes);
		model.addAttribute("Tags", tagservice.findByUser(user));
		model.addAttribute("MemeForm", new MeMeForm());
		model.addAttribute("message", "");
		return "main";
	}
	@RequestMapping(value = "/imageDisplay/{id}")
	  public void showImage(@PathVariable(value = "id") Integer itemId, HttpServletResponse response,HttpServletRequest request) 
	          throws ServletException, IOException{

		
	    Meme meme= memeservice.findById(itemId);        
	    Path path = Paths.get(meme.getPath());
	    byte[] data = Files.readAllBytes(path);
	    response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
	    response.getOutputStream().write(data);


	    response.getOutputStream().close();
	}
}
