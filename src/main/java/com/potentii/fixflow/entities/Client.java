package com.potentii.fixflow.entities;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;



/**
 * The persistent class for the client database table.
 * 
 */
@Entity
@Table(name="client")
public class Client implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="client_id")
	private Long id;
	
	@Column(name="name", nullable=false)
	private String name;
	
	@Column(name="phone", nullable=true)
	private String phone;
	
	@Column(name="email", nullable=true)
	private String email;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_added", columnDefinition="DATETIME not null default now()")
	private Calendar dateAdded;
	
	
	
	@PrePersist
	protected void onCreate(){
		dateAdded = Calendar.getInstance();
	}
	
	
	
	public Long getId() {
		return id;
	}
	public Client setId(Long id) {
		this.id = id;
		return this;
	}
	
	public String getName() {
		return name;
	}
	public Client setName(String name) {
		this.name = name;
		return this;
	}
	
	public String getPhone() {
		return phone;
	}
	public Client setPhone(String phone) {
		this.phone = phone;
		return this;
	}
	
	public String getEmail() {
		return email;
	}
	public Client setEmail(String email) {
		this.email = email;
		return this;
	}
	
	public Calendar getDateAdded() {
		return dateAdded;
	}
	public Client setDateAdded(Calendar dateAdded) {
		this.dateAdded = dateAdded;
		return this;
	}
	
}