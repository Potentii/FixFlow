package com.potentii.fixflow.entities;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.*;

import com.potentii.fixflow.entities.sets.ETicketStatus;
import com.potentii.fixflow.entities.sets.ETicketUrgency;



/**
 * The persistent class for the ticket database table.
 * 
 */
@Entity
@Table(name="ticket")
public class Ticket implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ticket_id")
	private Long id;
	
	@Enumerated(EnumType.STRING)
	@Column(name="urgency", nullable=false)
	private ETicketUrgency urgency;
	
	@Column(name="category", nullable=false)
	private String category;
	
	@Column(name="description", nullable=false)
	private String description;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status", nullable=false)
	private ETicketStatus status;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_opened", columnDefinition="DATETIME not null default now()")
	private Calendar dateOpened;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_closed", nullable=true)
	private Calendar dateClosed;
	
	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    @JoinColumn(name="ticket_client_fk")
	private Client client;

	
	
	@PrePersist
	protected void onCreate(){
		dateOpened = Calendar.getInstance();
	}
		
	
	
	public Long getId() {
		return id;
	}
	public Ticket setId(Long id) {
		this.id = id;
		return this;
	}

	public ETicketUrgency getUrgency() {
		return urgency;
	}
	public Ticket setUrgency(ETicketUrgency urgency) {
		this.urgency = urgency;
		return this;
	}

	public String getCategory() {
		return category;
	}
	public Ticket setCategory(String category) {
		this.category = category;
		return this;
	}

	public String getDescription() {
		return description;
	}
	public Ticket setDescription(String description) {
		this.description = description;
		return this;
	}

	public ETicketStatus getStatus() {
		return status;
	}
	public Ticket setStatus(ETicketStatus status) {
		this.status = status;
		return this;
	}

	public Calendar getDateOpened() {
		return dateOpened;
	}
	public Ticket setDateOpened(Calendar dateOpened) {
		this.dateOpened = dateOpened;
		return this;
	}

	public Calendar getDateClosed() {
		return dateClosed;
	}
	public Ticket setDateClosed(Calendar dateClosed) {
		this.dateClosed = dateClosed;
		return this;
	}

	public Client getClient() {
		return client;
	}
	public Ticket setClient(Client client) {
		this.client = client;
		return this;
	}
	
}