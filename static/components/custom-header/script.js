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
               <span class="custom-header-title">{{ title }}</span>
               <span class="custom-header-subtitle" v-if="subtitle">{{ subtitle }}</span>
            </div>
         </div>
      `
});
