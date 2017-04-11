// *Requiring the needed modules:
const dotenv = require('dotenv');
const db = require('./database/controller.js');
const server = require('./api/server.js');

// *Setting the finish flag:
let finish_signaled = false;



/**
 * Starts the server
 * @return {Promise} A promise that resolves into a { server, address } object, or rejects if something went wrong
 */
function start(){
   // *Trying to start the server:
   try{
      // *Getting the api router:
      const router = require('./api/router/router.js');

      // *Loading the environment:
      dotenv.config({path: './.env'});

      // *Connecting to the database:
      return db.connect({
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.DB_PORT || '3306',
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_SCHEMA
         })
         // *Setting up the API routes:
         .then(knex => router(knex))
         // *Setting up the server:
         .then(routes => server.start({
            routes,
            port: process.env.PORT || '80'
         }));

   } catch(err){
      // *Rejecting the promise if something went wrong:
      return Promise.reject(err);
   }
}



/**
 * Finishes all the services
 * @return {Promise} A promise that resolves when the services have been finished, or rejects if something went wrong
 */
function finish(){
   // *Checking if the finish signal has been set already, returning if it has:
   if(finish_signaled) return Promise.resolve();

   // *Setting the finish signal:
   finish_signaled = true;

   // *Disconnecting from the database:
   return db.disconnect()
      // *Stopping the server:
      .then(() => server.stop());
}



// *Exporting this module:
module.exports = { start, finish };
