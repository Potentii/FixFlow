pages.add('ticket', '/ticket', {

   components: {
      'custom-header': ui.get('custom-header'),
      'custom-footer': ui.get('custom-footer')
   },

   data(){
      return {
         item: {},

         date_local: 'pt-BR'
      };
   },

   mounted(){
      this.load();
   },

   methods: {

      getActorType(){
         return cache.getActor().type;
      },

      load(){
         // *Getting the ticket id from the query:
         const ticket_id = this.$route.query.t;

         // *Getting the ticket data:
         fetch(this.getActorType()==ACTORS.CLIENT ? '/api/v1/clients/tickets/' + ticket_id : '/api/v1/operators/tickets/' + ticket_id, {
               headers: new HeadersBuilder().addAccess().get()
            })
            // *Parsing the response body:
            .then(res => res.json())
            // *Updating the view:
            .then(item => this.item = item)
            // *Logging errors:
            .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      },

      closeTicket(){

      }

   },

   template:
      `
      <div class="ticket-page content-page">

         <custom-header title="Ticket"></custom-header>

         <div class="content-wrapper">

               <label class="x-labeled-output">
                  <span class="x-label">Title</span>
                  <span>{{ item.title }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Status</span>
                  <span>{{ item.status }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Urgency</span>
                  <span>{{ item.urgency }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Opening date</span>
                  <span>{{ new Date(item.date_opened).toLocaleDateString(date_local) }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Closing date</span>
                  <span v-if="item.date_closed">{{ new Date(item.date_closed).toLocaleDateString(date_local) }}</span>
                  <span v-if="!item.date_closed">Not closed yet</span>
               </label>

         </div>

         <template v-if="getActorType()==ACTORS.OPERATOR">
            <custom-footer>
               <button type="button" @click="closeTicket" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
                  close ticket
               </button>
            </custom-footer>
         </template>

         <template v-if="getActorType()==ACTORS.CLIENT && item.status=='CLOSED'">
            <custom-footer>
               <button type="button" @click="closeTicket" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
                  give feedback
               </button>
            </custom-footer>
         </template>
      </div>
      `
});
