package com.potentii.fixflow.entities;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.*;



/**
 * The persistent class for the feedback database table.
 *
 */
@Entity
@Table(name="feedback")
public class Feedback implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="feedback_id")
	private Long id;
	
	@Column(name="message")
	private String message;
	
	@Column(name="rating")
	private Integer rating;
	
	@Column(name="solved", nullable=false)
	private Boolean solved;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_added", columnDefinition="DATETIME not null default now()")
	private Calendar dateAdded;
	
	@OneToOne(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    @JoinColumn(name="feedback_ticket_fk")
	private Ticket ticket;
	
	
	
	@PrePersist
	protected void onCreate(){
		dateAdded = Calendar.getInstance();
	}
	
	

	public Long getId() {
		return id;
	}
	public Feedback setId(Long id) {
		this.id = id;
		return this;
	}

	public String getMessage() {
		return message;
	}
	public Feedback setMessage(String message) {
		this.message = message;
		return this;
	}

	public int getRating() {
		return rating;
	}
	public Feedback setRating(int rating) {
		this.rating = rating;
		return this;
	}

	public boolean isSolved() {
		return solved;
	}
	public Feedback setSolved(boolean solved) {
		this.solved = solved;
		return this;
	}

	public Calendar getDateAdded() {
		return dateAdded;
	}
	public Feedback setDateAdded(Calendar dateAdded) {
		this.dateAdded = dateAdded;
		return this;
	}

	public Ticket getTicket() {
		return ticket;
	}
	public Feedback setTicket(Ticket ticket) {
		this.ticket = ticket;
		return this;
	}
   
}
