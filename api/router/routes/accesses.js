
// *Exporting the routes:
module.exports = knex => {
   // *Requiring the key generation module:
   const uuid = require('uuid');

   // *Defining the entity name:
   const entity_name = 'access';

   // *Requiring the default CRUD routes factory for this resource:
   const crud_routes_factory = require('./crud-routes-factory.js')(entity_name, knex);



   /**
    * Checks if the supplied access headers are valid
    *  i.e. authentication
    */
   function check(req, res, next){
      // *Extracting the info from the request:
      const username = req.get('Access-User');
      const key = req.get('Access-Key');

      // *Getting the query builder for this resource:
      return knex('user_access')
         // *Selecting all the available fields:
         .select('id')
         // *Adding the condition:
         .where({ key, username })
         // *When the query resolves:
         .then(items => {
            // *Checking if any item has been found:
            if(items.length){
               // *If it has:
               // *Setting the user id on the response locals:
               res.locals.user = items[0].id;
               // *Sending the request to the next handler, as it passes the auth check:
               next();
            } else{
               // *If it hasn't:
               // *Sending a '401 UNAUTHORIZED' response, as the auth process has failed:
               res.status(401).end();
            }
         })
         .catch(err => {
            res.status(500).end();
         });
   }



   /**
    * Creates a new access for a user
    *  Does requires credentials check
    */
   function add(req, res, next){
      // *Building the data to be inserted:
      const insert_data = {
         // *Generating a random uuid string:
         key: uuid.v4(),
         // *Getting the user id from the last middleware:
         user_fk: res.locals.user
      };

      // *Executing the default CRUD route to create a new access:
      return crud_routes_factory.add(req, res, next, { insert_data });
   }



   // *Returning the routes available:
   return {
      check,
      add
   };

};
