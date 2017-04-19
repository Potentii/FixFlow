// *Requiring errors module:
const errors = require('../errors.js');



// *Exporting the routes:
module.exports = knex => {


   /**
    * [getActor description]
    * @param  {[type]} entity_name [description]
    * @param  {[type]} user        [description]
    * @return {[type]}             [description]
    */
   function getActor(entity_name, user){
      // *Rejecting if the entity isn't an actor:
      if(entity_name !== 'client' && entity_name !== 'operator')
         return Promise.reject(new Error('invalid actor resource'));

      // *Getting the query builder for an actor resource:
      return knex(entity_name)
         // *Selecting the id:
         .select('id')
         // *Adding the condition:
         .where({ user_fk: user })
         // *When the query resolves:
         .then(items => {
            // *Checking if any user has been found:
            if(items.length)
               // *If it has:
               // *Resolving with the actor's id:
               return items[0].id;
             else
               // *If it hasn't:
               // *Resolving with null:
               return null;
         });
   }



   /**
    * Inserts the client id in the response locals
    *  Does requires authentication
    */
   function extractClient(req, res, next){
      // *Extracting the user id from the locals:
      const user = res.locals.user;

      // *Trying to retrieve the actor:
      return getActor('client', user)
         .then(id => {
            // *Checking if the actor could be found:
            if(id !== null){
               // *If it could:
               // *Setting the client id on the response locals:
               res.locals.client = id;
               // *Sending the request to the next handler, as it passes the actor extraction:
               next();
            } else{
               // *If it couldn't:
               // *Sending a '403 FORBIDDEN' response, as the actor could not be extracted:
               res.status(403).end();
            }
         })
         .catch(err => errors.send(res, err));
   }



   /**
    * Inserts the operator id in the response locals
    *  Does requires authentication
    */
   function extractOperator(req, res, next){
      // *Extracting the user id from the locals:
      const user = res.locals.user;

      // *Trying to retrieve the actor:
      return getActor('operator', user)
         .then(id => {
            // *Checking if the actor could be found:
            if(id !== null){
               // *If it could:
               // *Setting the operator id on the response locals:
               res.locals.operator = id;
               // *Sending the request to the next handler, as it passes the actor extraction:
               next();
            } else{
               // *If it couldn't:
               // *Sending a '403 FORBIDDEN' response, as the actor could not be extracted:
               res.status(403).end();
            }
         })
         .catch(err => errors.send(res, err));
   }



   /**
    * Retrieves the actor info (id and type)
    *  Does requires authentication
    */
   function get(req, res, next){
      // *Extracting the user id from the locals:
      const user = res.locals.user;

      // *Trying to retrieve the actor as a client:
      return getActor('client', user)
         .then(id => {
            // *Checking if the actor could be found:
            if(id !== null){
               // *If it could:
               // *Sending a '200 OK' response, with the actor info:
               res.status(200).json({ id, type: 'client' }).end();
            } else{
               // *If it couldn't:
               // *Trying to retrieve the actor as an operator:
               return getActor('operator', user)
                  .then(id => {
                     // *Checking if the actor could be found:
                     if(id !== null){
                        // *If it could:
                        // *Sending a '200 OK' response, with the actor info:
                        res.status(200).json({ id, type: 'operator' }).end();
                     } else{
                        // *If it couldn't:
                        // *Sending a '404 NOT FOUND' response, as the actor could not be found:
                        res.status(404).end();
                     }
                  });
            }
         })
         .catch(err => errors.send(res, err));
   }



   // *Returning the routes available:
   return {
      extractClient,
      extractOperator,
      get
   };

};
