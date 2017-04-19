ui.add('ticket-list', {

   components: {
      'ticket-item': ui.get('ticket-item')
   },

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
         // *Checking if the user is a client:
         if(cache.getActor().type == ACTORS.CLIENT)
            // *If they're:
            return '/api/v1/clients/tickets';
         else
            // *If they aren't:
            return '/api/v1/operators/tickets';
      },

      load(){
         fetch(this.getTicketRoute(), {
               headers: new HeadersBuilder().addAccess().get()
            })
            .then(res => {
               if(res.status == 200)
                  return res.json()
                     .then(items => {
                        items.sort((a, b) => a.id - b.id);
                        this.items = items;
                     });
            })
            // *Logging errors:
            .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      }

   },

   template:
      `
         <ul class="ticket-list">
            <ticket-item :data="item" v-for="item in items"></ticket-item>
         </ul>
      `
});
