ui.add('ticket-item', {
   props: {
      'data': {
         type: Object,
         required: true
      }
   },
   template:
      `
         <li class="ticket-item">
            <div>
               <span class="ticket-item-title">{{ data.title }}</span>
               <span class="ticket-item-description">{{ data.description }}</span>
            </div>
            <div>
               <span class="ticket-item-date">{{ data.date }}</span>
            </div>
         </li>
      `
});
