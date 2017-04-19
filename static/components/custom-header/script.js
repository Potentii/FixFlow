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
         fetch('/api/v1/accesses', {
            method: 'DELETE',
            headers: new HeadersBuilder()
               .addAccess()
               .get()
         })
         .then(res => {
            switch(res.status){
               case 200:
                  cache.setAccess();
                  cache.setActor();
                  this.$router.push('/login');
                  break;
               default:
                  throw new Error('database error');
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
               <div class="custom-header-balance-container">
                  <button type="button" @click="logoff">
                     Exit
                  </button>
               </div>
            </div>
         </div>
      `
});
