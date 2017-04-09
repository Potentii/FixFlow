package com.potentii.fixflow.entities;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.*;



/**
 * The persistent class for the checkpoint database table.
 * 
 */
@Entity
@Table(name="checkpoint")
public class Checkpoint implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="checkpoint_id")
	private Long id;
	
	@Column(name="description", nullable=false)
	private String description;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_started", columnDefinition="DATETIME not null default now()")
	private Calendar dateStarted;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_finished", nullable=true)
	private Calendar dateFinished;
	
	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    @JoinColumn(name="checkpoint_operator_fk")
	private Operator operator;
	
	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    @JoinColumn(name="checkpoint_ticket_fk")
	private Ticket ticket;
	
	
	
	@PrePersist
	protected void onCreate(){
		dateStarted = Calendar.getInstance();
	}
	
	

	public Long getId() {
		return id;
	}
	public Checkpoint setId(Long id) {
		this.id = id;
		return this;
	}

	public String getDescription() {
		return description;
	}
	public Checkpoint setDescription(String description) {
		this.description = description;
		return this;
	}

	public Calendar getDateStarted() {
		return dateStarted;
	}
	public Checkpoint setDateStarted(Calendar dateStarted) {
		this.dateStarted = dateStarted;
		return this;
	}

	public Calendar getDateFinished() {
		return dateFinished;
	}
	public Checkpoint setDateFinished(Calendar dateFinished) {
		this.dateFinished = dateFinished;
		return this;
	}

	public Operator getOperator() {
		return operator;
	}
	public Checkpoint setOperator(Operator operator) {
		this.operator = operator;
		return this;
	}

	public Ticket getTicket() {
		return ticket;
	}
	public Checkpoint setTicket(Ticket ticket) {
		this.ticket = ticket;
		return this;
	}	

}