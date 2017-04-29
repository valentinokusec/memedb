package com.memedb.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;


import com.memedb.domains.User;
import com.memedb.domains.UserRole;
import com.memedb.repository.UserRepository;




@Service("UserService")
public class UserServiceImpl implements UserService,UserDetailsService{

	@Resource
	private UserRepository UserRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user=UserRepository.findByUserName(username);
		if(user==null){
            System.out.println("User not found");
            throw new UsernameNotFoundException("Username not found");
        }
		else
		{
            return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), 
                 true, true, true, true, getGrantedAuthorities(user));
		}
    }
	 private List<GrantedAuthority> getGrantedAuthorities(User user){
	        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
	         
	        for (UserRole userRole : user.getUserRole()) {
	        	authorities.add(new SimpleGrantedAuthority(userRole.getRole()));
			}
	        List<GrantedAuthority> Result = new ArrayList<GrantedAuthority>(authorities);
	        
	        System.out.print("authorities :"+authorities);
	        return Result;
	    }
	@Override
	public Page<User> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return UserRepository.findAll(pageable);
	}
	@Override
	public User create(User user) {
		// TODO Auto-generated method stub
		return UserRepository.save(user);
	}
	@Override
	public User update(User user) {
		// TODO Auto-generated method stub
		return UserRepository.save(user);
	}
	@Override
	public User findByUserName(String username) {
		// TODO Auto-generated method stub
		return UserRepository.findByUserName(username);
	}
	@Override
	public User findById(Integer id) {
		// TODO Auto-generated method stub
		return UserRepository.findOne(id);
		
		
	}
	 
	
	
			
}
