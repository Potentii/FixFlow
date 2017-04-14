
// *Exporting the routes:
module.exports = knex => {
   // *Defining the entity name:
   const entity_name = 'ticket';

   // *Requiring the default CRUD routes factory for this resource:
   const crud_routes_factory = require('./crud-routes-factory.js')(entity_name, knex);



   /**
    * Retrieves one resource from the database
    */
   function getOneFromClient(req, res, next){
      // *Extracting the info from the locals:
      const client = res.locals.client;
      // *Extracting the info from the request:
      const ticket = req.params.ticket;

      // *Getting the query builder for this resource:
      return knex(entity_name)
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
      // *Extracting the info from the locals:
      const client = res.locals.client;

      // *Getting the query builder for this resource:
      return knex(entity_name)
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
      // *Extracting the info from the locals:
      const operator = res.locals.operator;

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



   /**
    * Retrieves many resources from the database
    */
   function addOnClient(req, res, next){
      // *Extracting the info from the locals:
      const client = res.locals.client;
      // *Getting the insert data from the request body:
      const insert_data = req.body;
      // *Adding the client reference:
      insert_data.client_fk = client;

      // *Executing the default CRUD route:
      return crud_routes_factory.add(req, res, next, {insert_data});
   }



   // *Returning the routes available:
   return {
      getOneFromClient,
      getManyFromClient,
      getManyFromOperator,
      addOnClient
   };

};
