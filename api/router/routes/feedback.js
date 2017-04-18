// *Requiring errors module:
const errors = require('../errors.js');



// *Exporting the routes:
module.exports = knex => {
   // *Defining the entity name:
   const entity_name = 'feedback';

   // *Requiring the default CRUD routes factory for this resource:
   const crud_routes_factory = require('./crud-routes-factory.js')(entity_name, knex);



   /**
    * Retrieves one resource from the database
    */
   function getFromClient(req, res, next){
      // *Extracting the info from the locals:
      const client = res.locals.client;
      // *Extracting the info from the request:
      const ticket = req.params.ticket;

      // *Getting the query builder for the ticket:
      return knex('ticket')
         // *Selecting the id and client_fk columns:
         .select('id', 'client_fk')
         // *Adding the condition:
         .where({ id: ticket, client_fk: client })
         // *When the query resolves:
         .then(items => {
            // *Checking if any item has been found:
            if(items.length){
               // *If it has:
               // *Getting the query builder for this resource:
               return knex(entity_name)
                  // *Selecting all the available fields:
                  .select('*')
                  // *Adding the condition:
                  .where({ ticket_fk: ticket })
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
                  });
            } else{
               // *If it hasn't:
               // *Sending a '404 NOT FOUND' response:
               res.status(404).end();
            }
         })
         .catch(err => errors.send(res, err));
   }



   /**
    * Retrieves one resource from the database
    */
   function getFromOperator(req, res, next){
      // *Extracting the info from the locals:
      const operator = res.locals.operator;
      // *Extracting the info from the request:
      const ticket = req.params.ticket;


      return knex('operator')

         .select('department_fk')
         // *Adding the condition:
         .where({ id: operator})
         // *When the query resolves:
         .then(items => {
            // *Checking if any item has been found:
            if(items.length)
               // *If it has:

               return knex('department_tickets')
                  // *Selecting only the id:
                  .select('id')
                  // *Adding the condition:
                  .where({ department_id: items[0].department_fk, id: ticket })
                  // *When the query resolves:
                  .then(items => {
                     // *Checking if any item has been found:
                     if(items.length)
                        // *If it has:
                        // *Getting the query builder for this resource:
                        return knex(entity_name)
                           // *Selecting all the available fields:
                           .select('*')
                           // *Adding the condition:
                           .where({ ticket_fk: ticket })
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
                           });
                     else
                        // *If it hasn't:
                        // *Sending a '403 FORBIDDEN' response:
                        res.status(403).end();
                  });
            else
               // *If it hasn't:
               // *Sending a '404 NOT FOUND' response:
               res.status(404).end();
         })
         .catch(err => errors.send(res, err));
   }



   /**
    * Add a feedback
    */
   function add(req, res, next){
      // *Extracting the info from the locals:
      const client = res.locals.client;
      // *Extracting the info from the request:
      const ticket = req.params.ticket;

      // *Getting the query builder for the ticket:
      return knex('ticket')
         // *Selecting the id and client_fk columns:
         .select('id', 'client_fk')
         // *Adding the condition:
         .where({ id: ticket, client_fk: client })
         // *When the query resolves:
         .then(items => {
            // *Checking if any item has been found:
            if(items.length){
               // *If it has:
               // *Building the data to be inserted:
               const insert_data = {
                  message: req.body.message,
                  rating: req.body.rating,
                  solved: req.body.solved,
                  ticket_fk: ticket
               };
               // *Inserting the feedback:
               return crud_routes_factory.add(req, res, next, { insert_data });
            } else{
               // *If it hasn't:
               // *Sending a '404 NOT FOUND' response:
               res.status(404).end();
            }
         })
         .catch(err => errors.send(res, err));
   }



   // *Returning the routes available:
   return {
      getFromClient,
      getFromOperator,
      add
   };

};
