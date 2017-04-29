package com.memedb.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	  @Autowired
	    @Qualifier("UserService")
	    UserDetailsService userDetailsService;
	 
		
		 @Autowired
		    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
		        auth.userDetailsService(userDetailsService);
		        auth.authenticationProvider(authenticationProvider());
		    }
		     
		 
		 
		 @Bean
		    public DaoAuthenticationProvider authenticationProvider() {
		        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		        authenticationProvider.setUserDetailsService(userDetailsService);
		        authenticationProvider.setPasswordEncoder(passwordEncoder());
		        return authenticationProvider;
		    }
		 
	 
	    @Override
	    protected void configure(HttpSecurity http) throws Exception {
	        http
	            .authorizeRequests()
	            .antMatchers("/css/**", "/login").permitAll()
	            .antMatchers("/js/**", "/login").permitAll()
	            .antMatchers("/webjars/**", "/login").permitAll()
	            .antMatchers("/img/**", "/login").permitAll()
	         
	            .antMatchers("/", "/login").permitAll()
	        
	            
            .antMatchers("/**").authenticated()	
            .and()
            .exceptionHandling().accessDeniedPage("/")
	                .and()
	          
	                .formLogin()
	                    .loginPage("/login")
	                    .successHandler(successHandler())
	                    .permitAll()
	         
	                
	               
	                .and()
	                .logout()
	                .logoutUrl("/logout")
	                .logoutSuccessUrl("/index");
	       
	    }

	  
	    @Override
	    public void configure(WebSecurity web) throws Exception {
	       
	        web.ignoring().antMatchers("/updateservice/**");
	        web.ignoring().antMatchers("/newuser/**");
	        web.ignoring().antMatchers("/register/**");
	      
	       
	    }
	 
	    
	    @Bean
		public PasswordEncoder passwordEncoder(){
			PasswordEncoder encoder = new BCryptPasswordEncoder();
			return encoder;
		}
	    @Bean
	    public AuthenticationSuccessHandler successHandler() {
	        SimpleUrlAuthenticationSuccessHandler handler = new SimpleUrlAuthenticationSuccessHandler();
	        handler.setUseReferer(true);
	        return handler;
	    }
}
