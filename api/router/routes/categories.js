// *Requiring errors module:
const errors = require('../errors.js');



// *Exporting the routes:
module.exports = knex => {

   // *Defining the entity name:
   const entity_name = 'category';

   // *Requiring the default CRUD routes factory for this resource:
   const crud_routes_factory = require('./crud-routes-factory.js')(entity_name, knex);


   /**
    * Retrieves one resource from the database given its 'id'
    */
   function getOne(req, res, next){
      // *Extracting the 'id' from the request's url:
      const id = req.params.id;

      // *Executing the default CRUD route:
      return crud_routes_factory.getOne(req, res, next, {id});
   }



   /**
    * Retrieves all resources from the database
    */
   function getMany(req, res, next){
      // *Executing the default CRUD route:
      return crud_routes_factory.getMany(req, res, next);
   }



   /**
    * Creates a new resource in the database
    */
   function add(req, res, next){
      // *Extracting the insert data from the request's body:
      const insert_data = {
         name: req.body.name
      };

      // *Executing the default CRUD route:
      return crud_routes_factory.add(req, res, next, { insert_data });
   }



   /**
    * Updates an existing resource in the database
    */
   function update(req, res, next){
      // *Extracting the 'id' from the request's url:
      const id = req.params.id;

      // *Extracting the update data from the request's body:
      const update_data = {
         name: req.body.name
      };

      // *Executing the default CRUD route:
      return crud_routes_factory.update(req, res, next, { id, update_data });
   }



   /**
    * Removes an existing resource from the database
    */
   function remove(req, res, next){
      // *Extracting the 'id' from the request's url:
      const id = req.params.id;

      // *Executing the default CRUD route:
      return crud_routes_factory.remove(req, res, next, { id });
   }



   // *Returning the routes available:
   return {
      getOne,
      getMany,
      add,
      update,
      remove
   };

};
