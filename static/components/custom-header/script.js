ui.add('custom-header', {

   props: {
      'title': {
         type: String,
         required: true
      },
      'subtitle': {
         type: String,
         required: false
      }
   },

   methods: {

      logoff(){
         // *Removing the user's access:
         fetch('/api/v1/accesses', {
            method: 'DELETE',
            headers: new HeadersBuilder()
               .addAccess()
               .get()
         })
         .then(res => {
            // *Checking the response status:
            switch(res.status){
               case 200:
                  // *If everything went fine:
                  // *Cleaning the cache:
                  cache.setAccess();
                  cache.setActor();
                  // *Sending the user to the login page:
                  this.$router.push('/login');
                  break;
               default:
                  // *If some error happens:
                  // *Showing an error snack:
                  snack.error('The server couldn\'t proccess your request', snack.LONG);
                  // *Throwing an error:
                  throw new Error('server error');
            }
         })
         // *Logging errors:
         .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      }

   },

   template:
      `
         <div class="custom-header">
            <div>
               <div class="custom-header-logo-container">
                  <router-link :to="'/'">Fix</br>Flow</router-link>
               </div>
               <div class="custom-header-text-container">
                  <span class="custom-header-title">{{ title }}</span>
                  <span class="custom-header-subtitle" v-if="subtitle">{{ subtitle }}</span>
               </div>
               <div class="custom-header-logoff-container">
                  <button type="button" @click="logoff">
                     Exit
                  </button>
               </div>
            </div>
         </div>
      `
});
