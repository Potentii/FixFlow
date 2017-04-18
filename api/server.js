// *Requiring the needed modules:
const Configurator = require('w-srvr');

// *Creating a new server configurator:
const server = new Configurator();



/**
 * Configures and starts the API server
 * @param  {object} routes      All the routes available
 * @param  {string|number} port The server port
 * @return {Promise}            A promise that resolves into a { server, address } object, or rejects if something went wrong
 */
function start({ routes, port }){
   // *Returning the starting promise:
   return server

      // *Setting the server port:
      .port(port)

      // *Configuring static content:
      .static
         .add('/static/compositions', '../static/compositions')
         .add('/static/components', '../static/components')
         .add('/static/controls', '../static/controls')
         .add('/static/identity', '../static/identity')
         .add('/static/libs', '../static/node_modules')
         .add('/static/pages', '../static/pages')
         .index('../static/index.html', {root_only: false})

         .done()

      // *Configuring the API:
      .api

         // *Setting up the body parser:
         .most('/api/v1/*')
            .advanced
               .parseJSON()
               .done()


         /**
          * Credentials routes (i.e. login)
          */
         .get('/api/v1/credentials', routes.credentials.check)

         /**
          * Accesses routes (i.e. authentication)
          */
         .get('/api/v1/accesses', routes.accesses.check)
         .post('/api/v1/accesses', [routes.credentials.check, routes.accesses.add])

         /**
          * Actors routes (e.g. clients/operators id extraction)
          */
         .get('/api/v1/actors', [routes.accesses.check, routes.actors.get])

         /**
          * Categories routes
          */
         .get('/api/v1/categories', routes.categories.getMany)
         .get('/api/v1/categories/:id', routes.categories.getOne)
         .post('/api/v1/categories', routes.categories.add)
         .put('/api/v1/categories/:id', routes.categories.update)
         .delete('/api/v1/categories/:id', routes.categories.remove)

         /**
          * Client-actor tickets
          */
         .most('/api/v1/clients/*', [routes.accesses.check, routes.actors.extractClient])
         .get('/api/v1/clients/tickets', routes.tickets.getManyFromClient)
         .get('/api/v1/clients/tickets/:ticket', routes.tickets.getOneFromClient)
         .post('/api/v1/clients/tickets', routes.tickets.addOnClient)

         /**
          * Client-actor feedback
          */
         .get('/api/v1/clients/tickets/:ticket/feedback', routes.feedback.get)
         .post('/api/v1/clients/tickets/:ticket/feedback', routes.feedback.add)

         /**
          * Operator-actor tickets
          */
         .most('/api/v1/operators/*', [routes.accesses.check, routes.actors.extractOperator])
         .get('/api/v1/operators/tickets', routes.tickets.getManyFromOperator)
         .get('/api/v1/operators/tickets/:ticket/close', routes.tickets.closeTicket)
         .get('/api/v1/operators/tickets/:ticket', routes.tickets.getOneFromOperator)

         .done()

      // *Starting the server:
      .start();
}



/**
 * Stops all the server connections
 * @return {Promise} A promise that resolves if everything went fine, or rejects if something went wrong
 */
function stop(){
   // *Stopping the server:
   return server.stop();
}



// *Exporting this module:
module.exports = { start, stop };
