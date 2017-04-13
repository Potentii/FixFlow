
// *Exporting the routes:
module.exports = knex => {


   /**
    * Retrieves one resource from the database
    */
   function getOneFromClient(req, res, next){
      // *Extracting the info from the request:
      const client = req.get('Client');
      const ticket = req.params.ticket;

      // *Getting the query builder for this resource:
      return knex('ticket')
         // *Selecting all the available fields:
         .select('*')
         // *Adding the condition:
         .where({ id: ticket, client_fk: client })
         // *When the query resolves:
         .then(items => {
            // *Checking if any item has been found:
            if(items.length)
               // *If it has:
               // *Sending a '200 OK' response with the first item found:
               res.status(200).json(items[0]).end();
            else
               // *If it hasn't:
               // *Sending a '404 NOT FOUND' response:
               res.status(404).end();
         })
         .catch(err => {
            res.status(500).end();
         });
   }



   /**
    * Retrieves many resources from the database
    */
   function getManyFromClient(req, res, next){
      // *Extracting the info from the request:
      const client = req.get('Client');

      // *Getting the query builder for this resource:
      return knex('ticket')
         // *Selecting all the available fields:
         .select('*')
         // *Adding the condition:
         .where({ client_fk: client })
         // *When the query resolves:
         .then(items => {
            // *Sending a '200 OK' response with all the items found:
            res.status(200).json(items).end();
         })
         .catch(err => {
            res.status(500).end();
         });
   }



   /**
    * Retrieves many resources from the database
    */
   function getManyFromOperator(req, res, next){
      // *Extracting the info from the request:
      const operator = req.get('Operator');

      // *Getting the query builder for this resource:
      return knex('operator')
         // *Selecting all the available fields:
         .select('department_fk')
         // *Adding the condition:
         .where({ id: operator})
         // *When the query resolves:
         .then(items => {
            // *Checking if any item has been found:
            if(items.length)
               // *If it has:
               // *Getting the query builder for this resource view:
               return knex('department_tickets')
                  // *Selecting all the available fields:
                  .select('*')
                  // *Adding the condition:
                  .where({ department_id: items[0].department_fk })
                  // *When the query resolves:
                  .then(items => {
                        // *Sending a '200 OK' response with all the items found:
                        res.status(200).json(items).end();
                  });
            else
               // *If it hasn't:
               // *Sending a '404 NOT FOUND' response:
               res.status(404).end();
         })
         .catch(err => {
            res.status(500).end();
         });
   }



   // *Returning the routes available:
   return {
      getOneFromClient,
      getManyFromClient
   };

};
