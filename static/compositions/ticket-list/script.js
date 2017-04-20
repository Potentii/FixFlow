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
      // *Loading the tickets:
      this.load();
   },

   methods: {

      getTicketRoute(){
         // *Checking if the user is a client:
         if(cache.getActor().type == ACTORS.CLIENT)
            // *If they're:
            // *Returning the clients route:
            return '/api/v1/clients/tickets';
         else
            // *If they aren't:
            // *Returning the operators route:
            return '/api/v1/operators/tickets';
      },



      load(){
         // *Retrieving the tickets from the server:
         fetch(this.getTicketRoute(), {
               headers: new HeadersBuilder().addAccess().get()
            })
            .then(res => {
               // *Checking the response status:
               if(res.status == 200)
                  // *If everything went fine:
                  // *Parsing the response body:
                  return res.json()
                     .then(items => {
                        // *Sorting the tickets by their id:
                        items.sort((a, b) => a.id - b.id);
                        // *Updating the view:
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
