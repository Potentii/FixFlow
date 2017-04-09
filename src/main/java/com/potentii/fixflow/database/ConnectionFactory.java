package com.potentii.fixflow.database;

import java.util.concurrent.CompletableFuture;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class ConnectionFactory {
	private static ConnectionFactory instance;
	private final EntityManagerFactory factory;
	
	public static ConnectionFactory getInstance(){
		if(instance == null)
			instance = new ConnectionFactory("mysql-pu");
		
		return instance;
	}
	
	private ConnectionFactory(String persistenceUnit) {
		factory = Persistence.createEntityManagerFactory(persistenceUnit);
	}
	
	
	
	public EntityManager getConn(){
		return factory.createEntityManager();
	}
	
	public void close(){
		factory.close();
		instance = null;
	}
	
	
	public CompletableFuture<Void> exec(ExecutableTransaction transaction) {
		CompletableFuture<Void> future = new CompletableFuture<>();
		new Thread(() -> {
			EntityManager conn = ConnectionFactory.getInstance().getConn();
			
			conn.getTransaction().begin();
			transaction.execute(conn);
			conn.getTransaction().commit();
			
			conn.close();
			
			future.complete(null);
		}).start();
		
		return future;
	}
	
	
	/**
	 * Executes a hibernate command block
	 * @param transaction The query block
	 * @return A future that completes into the query block value, after the connection has been closed
	 */
	public <T> CompletableFuture<T> query(FetchableTransaction<T> transaction) {
		CompletableFuture<T> future = new CompletableFuture<>();
		new Thread(() -> {
			EntityManager conn = ConnectionFactory.getInstance().getConn();
			
			conn.getTransaction().begin();
			T result = transaction.fetch(conn);
			conn.getTransaction().commit();
			
			conn.close();
			
			future.complete(result);
		}).start();
		
		return future;
	}
	
	
	@FunctionalInterface
	public interface ExecutableTransaction{
		void execute(EntityManager conn);
	}
	
	@FunctionalInterface
	public interface FetchableTransaction<T>{
		T fetch(EntityManager conn);
	}
	
	
}

