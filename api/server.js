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
         .add('/static/js', '../static/js')
         .add('/static/css', '../static/css')
         .add('/static/res', '../static/res')
         .add('/static/libs', '../static/node_modules')
         .add('/static/js', '../static/js')
         .index('../static/index.html')

         .done()

      // *Configuring the API:
      .api

         // TODO define the API routes

         .get('/api/v1/categories', routes.categories.getMany)
         .get('/api/v1/categories/:id', routes.categories.getOne)
         .post('/api/v1/categories', routes.categories.add)
         .put('/api/v1/categories/:id', routes.categories.update)
         .delete('/api/v1/categories/:id', routes.categories.remove)


         .most('/api/v1/clients/*', (req, res, next) => next())
            .advanced
            .allowedHeaders('Client')
            .done()
         .get('/api/v1/clients/:client/tickets', routes.tickets.getOneFromClient)
         .get('/api/v1/clients/:client/tickets/:ticket', routes.tickets.getManyFromClient)


         .most('/api/v1/operators/*', (req, res, next) => next())
            .advanced
            .allowedHeaders('Operator')
            .done()
         .get('/api/v1/operators/:operator/tickets', routes.tickets.getManyFromOperator)
         //.get('/api/v1/operators/:operator/tickets/:ticket', routes.tickets.getManyFromOperator)

         .most('*', (req, res, next) => res.status(501).end())

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
