
/**
 * Retrieves all the routes modules into a single object
 * @param  {knex} knex The knex instance
 * @return {object}    The routes object
 */
module.exports = knex => {
   // *Returning the routes modules:
   return {
      tickets: require('./routes/tickets.js')(knex),
      categories: require('./routes/categories.js')(knex),
      departments: require('./routes/departments.js')(knex),
      checkpoints: {},
      clients: require('./routes/clients.js')(knex),
      operators: require('./routes/operators.js')(knex),
      feedback: require('./routes/feedback.js')(knex),
      credentials: require('./routes/credentials.js')(knex),
      actors: require('./routes/actors.js')(knex),
      accesses: require('./routes/accesses.js')(knex),
      reports: require('./routes/reports.js')(knex)
   };
};
