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
         if(cache.getActor().type == ACTORS.CLIENT)
            return '/api/v1/clients/tickets';
         else
            return '/api/v1/operators/tickets';
      },
      load(){
         // *Getting the access info from the cache:
         const access = cache.getAccess();

         fetch(this.getTicketRoute(), {
               headers: {
                  [ACCESS_HEADERS.USER]: access.user,
                  [ACCESS_HEADERS.KEY]: access.key
               }
            })
            .then(res => res.json())
            .then(items => {
               this.items = items;
            })
            .catch(err => {
               console.error(err);
            });

      }
   },
   template:
      `
         <ul class="ticket-list">
            <ticket-item :data="item" v-for="item in items"></ticket-item>
         </ul>
      `
});
