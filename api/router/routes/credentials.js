// *Requiring errors module:
const errors = require('../errors.js');



// *Exporting the routes:
module.exports = knex => {
   // *Defining the entity name:
   const entity_name = 'user';


   /**
    * Checks if the supplied credentials headers are valid
    *  i.e. login
    */
   function check(req, res, next){
      // *Extracting the info from the request:
      const username = req.get('Credential-User');
      const password = req.get('Credential-Pass');

      // *Getting the query builder for this resource:
      return knex(entity_name)
         // *Selecting all the available fields:
         .select('id')
         // *Adding the condition:
         .where({ username, password })
         // *When the query resolves:
         .then(items => {
            // *Checking if any user has been found:
            if(items.length){
               // *If it has:
               // *Setting the user id on the response locals:
               res.locals.user = items[0].id;
               // *Sending the request to the next handler, as it passes the credentials check:
               next();
            } else{
               // *If it hasn't:
               // *Sending a '401 UNAUTHORIZED' response, as the login process has failed:
               res.status(401).end();
            }
         })
         .catch(err => errors.send(res, err));
   }


   // *Returning the routes available:
   return {
      check
   };

};
