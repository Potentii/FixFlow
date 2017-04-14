ui.add('ticket-list', {
   components: {
      'ticket-item': ui.get('ticket-item')
   },
   props: {},
   data(){
      return {
         items: []
      };
   },
   mounted(){
      this.load();
   },
   methods: {
      getTicketRoute(){
         return '/api/v1/clients/tickets';
      },
      getContextHeader(){
         // TODO deprecate this method:
         return {'Client': 5};
      },
      load(){
         fetch(this.getTicketRoute(), {headers: this.getContextHeader()})
            .then(res => res.json())
            .then(items => {
               console.log(items);
               this.items = items;
            })
            .catch(err => {
               console.error(err);
            })

      }
   },
   template:
      `
         <ul class="ticket-list">
            <ticket-item :data="item" v-for="item in items"></ticket-item>
         </ul>
      `
});
