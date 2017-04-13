
module.exports = knex => {
   // TODO implement the API routes
   return {
      tickets: require('./routes/tickets.js')(knex),
      categories: require('./routes/categories.js')(knex),
      checkpoints: {},
      clients: {},
      operators: {},
      feedback: {},
      auth: {}
   };
};
