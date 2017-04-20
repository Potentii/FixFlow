ui.add('ticket-item', {
   
   props: {
      'data': {
         type: Object,
         required: true
      }
   },

   template:
      `
         <li class="ticket-item" @click="$router.push('/ticket/' + data.id)" :data-status="data.status">
            <div>
               <div>
                  <span class="ticket-item-title">{{ data.title }}</span>
                  <div class="ticket-item-date-container">
                     <span class="ticket-item-date-opened" title="opening date">{{ new Date(data.date_opened).toLocaleDateString(LOCALE) }}</span>
                     <span class="ticket-item-date-closed" title="closing date" v-if="data.status=='CLOSED'"> - {{ new Date(data.date_closed).toLocaleDateString(LOCALE) }}</span>
                  </div>
               </div>
               <div>
                  <span class="ticket-item-description">{{ data.description }}</span>
                  <i class="material-icons" :title="'urgency: ' + data.urgency" :data-status="data.status" :data-urgency="data.urgency">whatshot</i>
               </div>
            </div>
         </li>
      `
});
