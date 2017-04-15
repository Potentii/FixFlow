ui.add('ticket-item', {
   props: {
      'data': {
         type: Object,
         required: true
      }
   },

   data(){
      return {
         date_local: 'en-US'
      };
   },

   mounted(){
      this.date_local = 'pt-BR';
   },

   template:
      `
         <li class="ticket-item" :data-status="data.status">
            <div>
               <div>
                  <span class="ticket-item-title">{{ data.title }}</span>
                  <div class="ticket-item-date-container">
                     <span class="ticket-item-date-opened">{{ new Date(data.date_opened).toLocaleDateString(date_local) }}</span>
                     <span class="ticket-item-date-separator" v-if="data.status=='CLOSED'">-</span>
                     <span class="ticket-item-date-closed" v-if="data.status=='CLOSED'">{{ new Date(data.date_closed).toLocaleDateString(date_local) }}</span>
                  </div>
               </div>
               <div>
                  <span class="ticket-item-description">{{ data.description }}</span>
               </div>
            </div>
         </li>
      `
});
