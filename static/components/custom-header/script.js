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
               </div>
            </div>
         </div>
      `
});
