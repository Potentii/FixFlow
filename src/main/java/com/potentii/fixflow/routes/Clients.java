package com.potentii.fixflow.routes;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.potentii.fixflow.database.ConnectionFactory;
import com.potentii.fixflow.entities.Client;

@Path("v1/clients")
public class Clients {
	
	
	
	/**
	 * Retrieves a single client, given its id
	 * @param id The client's id
	 */
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void getOne(@Suspended final AsyncResponse res, @PathParam("id") Long id){
		
		// *Finding the item that has the given id:
		ConnectionFactory.getInstance().query(conn -> conn.find(Client.class, id))
			.thenAccept(item -> {
				// *Declaring the response builder:
				ResponseBuilder rb;
				// *Checking if it has found any item:
				if(item != null)
					// *If it has:
					// *Building a '200 OK' response with the found object:
					rb = Response.status(Response.Status.OK).entity(item);
				else
					// *If it hasn't:
					// *Building a '404 NOT FOUND' response, as none item could be found:
					rb = Response.status(Response.Status.NOT_FOUND);
				
				// *Sending the response:
				res.resume(rb.build());
			});
	}
	
	
	
	
	@GET
	@Path("{id}/tickets")
	@Produces(MediaType.APPLICATION_JSON)
	public void getTickets(@Suspended final AsyncResponse res, @PathParam("id") Long id){
		
		// *Finding the item that has the given id:
		ConnectionFactory.getInstance().query(conn -> conn.find(Client.class, id))
			.thenAccept(item -> {
				// *Declaring the response builder:
				ResponseBuilder rb;
				// *Checking if it has found any item:
				if(item != null)
					// *If it has:
					// *Building a '200 OK' response with the found object:
					rb = Response.status(Response.Status.OK).entity(item);
				else
					// *If it hasn't:
					// *Building a '404 NOT FOUND' response, as none item could be found:
					rb = Response.status(Response.Status.NOT_FOUND);
				
				// *Sending the response:
				res.resume(rb.build());
			});
	}
}
