/**
 * Controls the pages initialization
 */
const pages = (function(){

   /**
    * Represents a set of pages to be initialized
    */
   class PagesConfigurator{

      /**
       * Builds a new PagesConfigurator
       */
      constructor(){
         /**
          * The Vuejs router reference
          * @private
          * @type {object}
          */
         this._router = null;

         /**
          * The list of pages, as { name, route, model } objects
          * @private
          * @type {Array}
          */
         this._resources = [];
      }



      /**
       * Adds a new page
       * @param  {string} name       The page name
       * @param  {string} route      The page route pattern
       * @param  {object} [model={}] The Vuejs model for this page
       * @return {PagesConfigurator} This configurator, for method chaining
       */
      add(name, route, model = {}){
         // *Adding the page:
         this._resources.push({ name, route, model });
         // *Returning this configurator:
         return this;
      }



      /**
       * Signals that the UI can be initialized
       * @return {Promise} A promise that resolves when the UI gets initialized, or rejects if some error has been thrown
       */
      done(){
         // *Returning the initialization promise chain:
         return new Promise((resolve, reject) => {
            // *When the DOM gets loaded:
            addEventListener('DOMContentLoaded', () => {
               // *Trying to start the UI:
               try{
                  // *Generating the routes list:
                  const routes = this._resources.map(({ name, route, model }) => {
                     return { name, path:route, component:model };
                  });

                  // *Starting the router:
                  const router = new VueRouter({ mode: 'history', routes });

                  // *Initializing the UI:
                  const app = new Vue({ router })
                     .$mount('#app');

                  // *Resolving with the router reference:
                  resolve(router);
               } catch(err){
                  // *If some error has been thrown:
                  // *Rejecting with the error:
                  reject(err);
               }
            });
         })
         // *Setting the router reference:
         .then(router => this._router = router);
      }



      /**
       * Retrieves a copy of the pages list
       * @readonly
       * @type {Array}
       */
      get list(){
         return this._resources.concat([]);
      }



      /**
       * Retrieves the Vuejs router reference
       * @readonly
       * @type {object}
       */
      get router(){
         return this._router;
      }

   }



   // *Returning an instance if this configurator:
   return new PagesConfigurator();
})();
