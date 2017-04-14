
// *Exporting the routes:
module.exports = knex => {



   /**
    * Inserts the client id in the response locals
    *  Does requires authentication
    */
   function extractClient(req, res, next){
      // *Extracting the info from the request:
      const user = res.locals.user;

      // *Getting the query builder for a resource:
      return knex('client')
         // *Selecting all the available fields:
         .select('id')
         // *Adding the condition:
         .where({ user_fk: user })
         // *When the query resolves:
         .then(items => {
            // *Checking if any user has been found:
            if(items.length){
               // *If it has:
               // *Setting the client id on the response locals:
               res.locals.client = items[0].id;
               // *Sending the request to the next handler, as it passes the actor extraction:
               next();
            } else{
               // *If it hasn't:
               // *Sending a '403 FORBIDDEN' response, as the client could not be extracted:
               res.status(403).end();
            }
         })
         .catch(err => {
            res.status(500).end();
         });
   }



   /**
    * Inserts the operator id in the response locals
    *  Does requires authentication
    */
   function extractOperator(req, res, next){
      // *Extracting the info from the request:
      const user = res.locals.user;

      // *Getting the query builder for a resource:
      return knex('operator')
         // *Selecting all the available fields:
         .select('id')
         // *Adding the condition:
         .where({ user_fk: user })
         // *When the query resolves:
         .then(items => {
            // *Checking if any user has been found:
            if(items.length){
               // *If it has:
               // *Setting the operator id on the response locals:
               res.locals.operator = items[0].id;
               // *Sending the request to the next handler, as it passes the actor extraction:
               next();
            } else{
               // *If it hasn't:
               // *Sending a '403 FORBIDDEN' response, as the operator could not be extracted:
               res.status(403).end();
            }
         })
         .catch(err => {
            res.status(500).end();
         });
   }



   // *Returning the routes available:
   return {
      extractClient,
      extractOperator
   };

};
