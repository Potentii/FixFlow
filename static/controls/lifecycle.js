// *Setting up Vuejs configs:
Vue.config.silent = false;

// *Signaling that the UI can be initialized:
pages.done()
   .then(() => {
      // *Logging that the UI is ready:
      (ENV!=ENVS.PROD) && console.info('UI ready');

      // *Implementing the auth middleware:
      const auth = (to, from, next) => {
         // *Discarding the access check on the '/login' route:
         if(to.fullPath==='/login') return next();

         // *Testing the access info on cache:
         attemptToAccess()
            .then(() => {
               // *Getting the actor info (only if it is consistent):
               const actor = cache.hasActor() ? cache.getActor() : null;

               // *Checking if the actor info is missing:
               if(!actor)
                  // *If it is:
                  // *Trying to fetch it from server:
                  return fetchActorInfo()
                     // *Saving it on cache:
                     .then(({ id, type }) => cache.setActor(id, type));
            })
            .then(() => {
               // *If the authentication went ok:
               // *Sending the user to the desired page:
               next();
            })
            .catch(err => {
               // *If some error happens or the authentication fails:
               // *Logging it out:
               (ENV!=ENVS.PROD) && console.error(err);
               // *Sending the user to the login page:
               pages.router.push('/login');
            });
      };

      // *Adding the auth middleware to all routes:
      pages.router.beforeEach(auth);

      // *Getting the current page path:
      const curr_page = pages.router.history.current;

      // *Calling the initial auth check:
      auth(curr_page, null, () => {});
   })
   // *Logging errors:
   .catch(err => (ENV!=ENVS.PROD) && console.error(err));



/**
 * Retrieves the current user's actor info
 * @return {Promise<Actor>} Resolves into an { id, type } actor object, or rejects if the actor couldn't be found (or if some error happens)
 */
function fetchActorInfo(){
   // *Trying to fetch the actor info:
   return fetch('/api/v1/actors', {
         headers: new HeadersBuilder().addAccess().get()
      })
      .then(res => {
         // *Checking the response status:
         switch (res.status) {
         case 200:
            // *If the authentication went ok:
            // *Resolving the promise chain:
            return res.json()
               .then(actor => {
                  return {
                     id: actor.id,
                     type: actor.type
                  };
               });
         case 404:
         default:
            // *If the authentication fails:
            // *Rejecting the promise chain:
            throw new Error('actor not found');
         }
      });
}



/**
 * Checks the access status, using the user/key stored on cache
 * @return {Promise} It resolves if the access is valid, or rejects if it's not valid (or if some error happens)
 */
function attemptToAccess(){   
   // *Retrieving the access status:
   return fetch('/api/v1/accesses', {
         headers: new HeadersBuilder().addAccess().get()
      })
      .then(res => {
         // *Checking the response status:
         switch(res.status){
         case 200:
            // *If the authentication went ok:
            // *Resolving the promise chain:
            return;
         case 401:
         default:
            // *If the authentication fails:
            // *Rejecting the promise chain:
            throw new Error('invalid access info');
         }
      });

}
