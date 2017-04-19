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
         .add('/static/res', '../static/res')
         .index('../static/index.html', {root_only: false})

         .done()

      // *Configuring the API:
      .api

         // *Setting up the body parser:
         .most('/api/v1/*')
            .advanced
               .parseJSON()
               .done()



         // *Setting up the credentials routes (i.e. login):
         .get('/api/v1/credentials', routes.credentials.check)

         // *Setting up the accesses routes (i.e. authentication):
         .get('/api/v1/accesses',      routes.accesses.check)
         .post('/api/v1/accesses',     [routes.credentials.check, routes.accesses.add])
         .delete('/api/v1/accesses',   [routes.accesses.check, routes.accesses.revoke])

         // *Requiring authentication on the following routes:
         .most('/api/v1/*', routes.accesses.check)



         // *Setting up the actors routes (e.g. clients/operators id extraction):
         .get('/api/v1/actors', routes.actors.get)



         // *Setting up the departments routes:
         .get('/api/v1/departments',         routes.departments.getMany)
         .get('/api/v1/departments/:id',     routes.departments.getOne)
         .post('/api/v1/departments',        routes.departments.add)
         .put('/api/v1/departments/:id',     routes.departments.update)
         .delete('/api/v1/departments/:id',  routes.departments.remove)



         // *Setting up the categories routes:
         .get('/api/v1/categories',          routes.categories.getMany)
         .get('/api/v1/categories/:id',      routes.categories.getOne)
         .post('/api/v1/categories',         routes.categories.add)
         .put('/api/v1/categories/:id',      routes.categories.update)
         .delete('/api/v1/categories/:id',   routes.categories.remove)



         // *Setting up the client tickets routes:
         .get('/api/v1/clients/tickets',           [routes.actors.extractClient, routes.tickets.getManyFromClient])
         .get('/api/v1/clients/tickets/:ticket',   [routes.actors.extractClient, routes.tickets.getOneFromClient])
         .post('/api/v1/clients/tickets',          [routes.actors.extractClient, routes.tickets.addOnClient])

         // *Setting up the client feedback routes:
         .get('/api/v1/clients/tickets/:ticket/feedback',   [routes.actors.extractClient, routes.feedback.getFromClient])
         .post('/api/v1/clients/tickets/:ticket/feedback',  [routes.actors.extractClient, routes.feedback.add])

         // *Setting up the clients CRUD routes:
         .get('/api/v1/clients',          routes.clients.getMany)
         .get('/api/v1/clients/:id',      routes.clients.getOne)
         .post('/api/v1/clients',         routes.clients.add)
         .put('/api/v1/clients/:id',      routes.clients.update)
         .delete('/api/v1/clients/:id',   routes.clients.remove)



         // *Setting up the operator tickets routes:
         .get('/api/v1/operators/tickets',               [routes.actors.extractOperator, routes.tickets.getManyFromOperator])
         .get('/api/v1/operators/tickets/:ticket/close', [routes.actors.extractOperator, routes.tickets.closeTicket])
         .get('/api/v1/operators/tickets/:ticket',       [routes.actors.extractOperator, routes.tickets.getOneFromOperator])

         // *Setting up the operator feedback routes:
         .get('/api/v1/operators/tickets/:ticket/feedback', [routes.actors.extractOperator, routes.feedback.getFromOperator])

         // *Setting up the operators CRUD routes:
         .get('/api/v1/operators',        routes.operators.getMany)
         .get('/api/v1/operators/:id',    routes.operators.getOne)
         .post('/api/v1/operators',       routes.operators.add)
         .put('/api/v1/operators/:id',    routes.operators.update)
         .delete('/api/v1/operators/:id', routes.operators.remove)



         // *Setting up the reports routes:
         .get('/api/v1/reports', [routes.actors.extractOperator, routes.reports.generate])

         

         // *Finishing the API routes configuration:
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
