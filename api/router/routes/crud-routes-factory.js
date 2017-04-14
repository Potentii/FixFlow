// *Requiring errors module:
const errors = require('../errors.js');



/**
 * Retrieves one resource from the database given its 'id'
 * @param  {string} table_name     The resource name
 * @param  {*} knex                The knex instance
 * @param  {number|string} data.id The resource id
 * @return {Promise}               The promise chain
 */
function getOne(table_name, knex, req, res, next, { id }){
   // *Getting the query builder for this resource:
   return knex(table_name)
      // *Selecting all the available fields:
      .select('*')
      // *Adding the condition:
      .where({ id })
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
      .catch(err => errors.send(res, err));
}



/**
 * Retrieves all resources from the database
 * @param  {string} table_name     The resource name
 * @param  {*} knex                The knex instance
 * @return {Promise}               The promise chain
 */
function getMany(table_name, knex, req, res, next){
   // *Getting the query builder for this resource:
   return knex(table_name)
      // *Selecting all the available fields:
      .select('*')
      // *When the query resolves:
      .then(items => {
         // *Sending a '200 OK' response with all the found items:
         res.status(200).json(items).end();
      })
      .catch(err => errors.send(res, err));
}



/**
 * Creates a new resource in the database
 * @param  {string} table_name       The resource name
 * @param  {*} knex                  The knex instance
 * @param  {object} data.insert_data The resource content
 * @return {Promise}                 The promise chain
 */
function add(table_name, knex, req, res, next, { insert_data }){
   // *Getting the query builder for this resource:
   return knex(table_name)
      // *Adding a insert statement to the query:
      .insert(insert_data)
      // *When the query resolves:
      .then(inserted_ids => {
         // *Checking if the database inserted some elements:
         if(inserted_ids.length)
            // *Sending a '201 CREATED' response with the inserted instance id:
            res.status(201).json({id: inserted_ids[0]}).end();
         else
            // *If it didn't:
            // *Sending a '400 BAD REQUEST' response:
            res.status(400).end();
      })
      .catch(err => errors.send(res, err));
}



/**
 * Updates an existing resource in the database
 * @param  {string} table_name       The resource name
 * @param  {*} knex                  The knex instance
 * @param  {number|string} data.id   The resource id
 * @param  {object} data.insert_data The new resource content
 * @return {Promise}                 The promise chain
 */
function update(table_name, knex, req, res, next, { id, update_data }){
   // *Getting the query builder for this resource:
   return knex(table_name)
      // *Adding a update statement to the query:
      .update(update_data)
      // *Adding the condition:
      .where({ id })
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



/**
 * Removes an existing resource from the database
 * @param  {string} table_name       The resource name
 * @param  {*} knex                  The knex instance
 * @param  {number|string} data.id   The resource id
 * @return {Promise}                 The promise chain
 */
function remove(table_name, knex, req, res, next, { id }){
   // *Getting the query builder for this resource:
   return knex(table_name)
      // *Adding a delete statement to the query:
      .del()
      // *Adding the condition:
      .where({ id })
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



/**
 * Retrieves the available CRUD routes for the given resource
 * @param  {string} table_name The resource name
 * @param  {*} knex            The knex instance
 * @return {object}            An object with all the available CRUD routes
 */
module.exports = (table_name, knex) => {
   // *Exporting the CRUD routes, and applying constant arguments:
   return {
      getOne:  getOne.bind(getOne, table_name, knex),
      getMany: getMany.bind(getMany, table_name, knex),
      add:     add.bind(add, table_name, knex),
      update:  update.bind(update, table_name, knex),
      remove:  remove.bind(remove, table_name, knex)
   };
};
