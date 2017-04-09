package com.potentii.fixflow.entities;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.*;



/**
 * The persistent class for the operator database table.
 * 
 */
@Entity
@Table(name="operator")
public class Operator implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="operator_id")
	private Long id;
	
	@Column(name="name", nullable=false)
	private String name;
	
	@Column(name="department", nullable=false)
	private String department;
	
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
	public Operator setId(Long id) {
		this.id = id;
		return this;
	}
	
	public String getName() {
		return name;
	}
	public Operator setName(String name) {
		this.name = name;
		return this;
	}
	
	public String getDepartment() {
		return department;
	}
	public Operator setDepartment(String department) {
		this.department = department;
		return this;
	}	
	
	public Calendar getDateAdded() {
		return dateAdded;
	}
	public Operator setDateAdded(Calendar dateAdded) {
		this.dateAdded = dateAdded;
		return this;
	}

}