package com.memedb.domains;

import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import lombok.Data;

@Entity
@Data
@Table(name="user")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private int id;
	@Column(name="username")
	private String userName;
	@Column(name="password")
	private String password;
	@JoinColumn(name = "user_id")
	@OneToMany(fetch=FetchType.EAGER)
	@LazyCollection(LazyCollectionOption.FALSE)
    public Set<UserRole> userRole;
	@JoinColumn(name = "meme_id")
	@OneToMany(fetch=FetchType.EAGER)
	@LazyCollection(LazyCollectionOption.FALSE)
	@Fetch(value = FetchMode.SUBSELECT)
    public Set<Meme> meme;
	
	
	

	
}
