package com.potentii.fixflow.server;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.potentii.fixflow.database.ConnectionFactory;
import com.potentii.fixflow.entities.Client;
import com.potentii.fixflow.entities.Operator;



public class ServerLifecycle implements ServletContextListener{

	@Override
	public void contextDestroyed(ServletContextEvent context) {
		ConnectionFactory.getInstance().close();
	}

	@Override
	public void contextInitialized(ServletContextEvent context) {
		
		// *Trying to create test objects:
		try {
		
			// *Generating the first client and operator:
			Client client = new Client()
					.setName("Andrea")
					.setPhone("555-55555")
					.setEmail("abc@def.com");
			
			Operator operator = new Operator()
					.setName("Mark")
					.setDepartment("IT");
		
		
			// *Saving them both in the database:
			ConnectionFactory.getInstance().exec(conn -> {
				conn.persist(client);
				conn.persist(operator);
			});
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
