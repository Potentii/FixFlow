
// *Exporting the routes:
module.exports = knex => {


   /**
    * Retrieves one resource from the database given its 'id'
    */
   function getOneFromClient(req, res, next){
      // *Extracting the 'id' from the request's url:
      const client = req.params.client;

      // *Getting the query builder for the client resource:
      return knex('client')

         .select('ticket_fk')
         // *Adding the condition:
         .where({ id: client })
         // *When the query resolves:
         .then(items => {
            // *Checking if any item has been found:
            if(items.length)
               // *If it has:
               return knex('ticket')

                  .select('*')
                  // *Adding the condition:
                  .where({ id: items[0].ticket_fk })
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
      getOneFromClient
   };

};
