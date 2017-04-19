// *Requiring errors module:
const errors = require('../errors.js');



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
      const user = req.get('Access-User') || '';
      const key = req.get('Access-Key') || '';

      // *Getting the query builder for this resource:
      return knex('access')
         // *Selecting all the columns:
         .select()
         // *Adding the condition:
         .where({ key, user_fk: user })
         // *When the query resolves:
         .then(items => {
            // *Checking if any item has been found:
            if(items.length){
               // *If it has:
               // *Setting the user id on the response locals:
               res.locals.user = items[0].user_fk;
               // *Setting the request status to '200 OK', as this route might be used alone:
               res.status(200);
               // *Sending the request to the next handler, as it passes the auth check:
               next();
            } else{
               // *If it hasn't:
               // *Sending a '401 UNAUTHORIZED' response, as the auth process has failed:
               res.status(401).end();
            }
         })
         .catch(err => errors.send(res, err));
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

      return crud_routes_factory.add(req, res, next, { insert_data }, (body) => {
         // *If everything went fine:
         // *Sending a '201 CREATED' response with the generated key and the user id:
         res.status(201).json({ key: insert_data.key, user: insert_data.user_fk }).end();
      });
   }



   /**
    * Removes a acces token
    *  Does requires access authentication
    */
   function revoke(req, res, next){
      // *Extracting the info from the request:
      const key = req.get('Access-Key') || '';

      // *Getting the query builder for this resource:
      return knex(entity_name)
         // *Adding a delete statement to the query:
         .del()
         // *Adding the condition:
         .where({ key })
         // *When the query resolves:
         .then(affected_rows => {
            // *Checking if this query did affect any instances:
            if(affected_rows)
               // *If it did:
               // *Sending a '200 OK' response:
               res.status(200).end();
            else
               // *If it didn't:
               // *Sending a '404 NOT FOUND' response:
               res.status(404).end();
         })
         .catch(err => errors.send(res, err));
   }



   // *Returning the routes available:
   return {
      check,
      add,
      revoke
   };

};
