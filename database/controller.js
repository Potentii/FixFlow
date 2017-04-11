/**
 * The knex instance
 */
let knex = null;



/**
 * Starts a knex instance and test its connections pool
 * @param  {object} settings The setting to configure the database connection
 * @return {Promise<knex>} A promise that resolves with the knex instance, or rejects if some error happened
 */
function connect(settings){

   // *Returning a promise chain:
   return new Promise((resolve, reject) => {
      // *Trying to get a knex instance:
      try{
         // *Defining a verification function:
         const isSet = v => v!==undefined || v!==null;

         // *Checking if the database settings are set, throwing an error if they aren't:
         if(!isSet(settings.host))
            throw new Error('Missing database hostname');
         if(!isSet(settings.port))
            throw new Error('Missing database port');
         if(!isSet(settings.user))
            throw new Error('Missing database user');
         if(!isSet(settings.password))
            throw new Error('Missing database password');
         if(!isSet(settings.database))
            throw new Error('Missing database schema');

         // *Requiring the knex module and configuring it:
         knex = require('knex')({
            client: 'mysql2',
            connection: {
               host: settings.host,
               port: settings.port,
               user: settings.user,
               password: settings.password,
               database: settings.database
            },
            pool: {
               min: 1,
               max: 6
            }
         });

         // *Resolving with the configured knex instance:
         resolve(knex);
      } catch(err){
         // *If some error happened:
         // *Rejecting with the error:
         reject(err);
      }
   })

   // *Testing the pool:
   .then(knex => {
      // *Appending a 'pool connection test' into the promise chain:
      return new Promise((resolve, reject) => {
         // *Setting a timeout flag:
         let timeout = false;

         // *Setting up a timeout timer:
         const timer = setTimeout(() => timeout = true, knex.client.config.acquireConnectionTimeout || 60000);

         // *Trying to acquire a new connection from the internal knex pool:
         knex.client.pool.acquire((err, conn) => {
            // *Releasing the connection:
            knex.client.pool.release(conn);

            // *Checking if some error has been thrown, rejecting if it has:
            if(err) return reject(err);

            // *Checking if the test has timed out, rejecting if it has:
            if(timeout) return reject(new Error('The pool connection test has timed out'));

            // *Stopping the timeout timer:
            clearTimeout(timer);

            // *Resolving with the knex instance:
            resolve(knex);
         });

      });

   });

}



/**
 * Closes the knex connections
 * @return {Promise}
 */
function disconnect(){
   // *Checking if the knex variable is assigned, resolving if it's not:
   if(!knex) return Promise.resolve();

   // *Closing the connections and returning a promise:
   return knex.destroy();
}



// *Exporting this module:
module.exports = { connect, disconnect };
