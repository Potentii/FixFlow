pages.add('ticket', '/ticket/:id', {

   components: {
      'custom-header': ui.get('custom-header'),
      'custom-footer': ui.get('custom-footer')
   },

   data(){
      return {
         id: undefined,

         item: {},
         has_feedback: true
      };
   },

   mounted(){
      this.id = this.$route.params.id;
      this.load();
   },

   methods: {

      getActorType(){
         return cache.getActor().type;
      },

      load(){
         // *Getting the ticket id from the query:
         const ticket_id = this.id;

         // *Getting the feedback data:
         fetch(this.getActorType()==ACTORS.CLIENT ? '/api/v1/clients/tickets/' + ticket_id + '/feedback' : '/api/v1/operators/tickets/' + ticket_id + '/feedback', {
               headers: new HeadersBuilder().addAccess().get()
            })
            .then(res => {
               switch(res.status){
                  case 200:
                     this.has_feedback = true;
                     break;
                  default:
                     this.has_feedback = false;
               }
            })
            // *Logging errors:
            .catch(err => (ENV!=ENVS.PROD) && console.error(err));


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

      advanceStatus(){
         // *Getting the ticket id from the query:
         const ticket_id = this.id;

         // *Advancing the ticket status:
         fetch('/api/v1/operators/tickets/' + ticket_id + '/status/advance', {
               headers: new HeadersBuilder().addAccess().get()
            })
            .then(res => {
               // *Checking the response status:
               switch(res.status){
               case 200:
                  // *If everything went fine:
                  // TODO show a snack
                  // *Updating the view:
                  this.load();
                  break;
               default:
                  // *If other error happened:
                  // TODO show a snack
                  // *Throwing an error:
                  throw new Error('server error');
               }
            })
            // *Logging errors:
            .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      }

   },

   template:
      `
      <div class="ticket-page content-page">

         <custom-header title="Ticket"></custom-header>

         <div class="content-wrapper">

            <div class="content">

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
                  <span class="x-label">Description</span>
                  <span>{{ item.description }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Opening date</span>
                  <span>{{ new Date(item.date_opened).toLocaleDateString(LOCALE) }}</span>
                  <span>{{ new Date(item.date_opened).toLocaleTimeString(LOCALE) }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Closing date</span>
                  <span v-if="item.date_closed">{{ new Date(item.date_closed).toLocaleDateString(LOCALE) }}</span>
                  <span v-if="item.date_closed">{{ new Date(item.date_closed).toLocaleTimeString(LOCALE) }}</span>
                  <span v-if="!item.date_closed">Not closed yet</span>
               </label>

            </div>

         </div>

         <template v-if="getActorType()==ACTORS.OPERATOR && (item.status=='PENDING' || item.status=='SOLVING' || has_feedback)">
            <custom-footer>
               <button v-if="item.status=='PENDING'" type="button" @click="advanceStatus" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
                  mark as solving
               </button>

               <button v-if="item.status=='SOLVING'" type="button" @click="advanceStatus" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
                  close ticket
               </button>

               <button v-if="has_feedback" type="button" @click="$router.push('/ticket/' + $route.params.id + '/feedback')" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
                  see feedback
               </button>
            </custom-footer>
         </template>

         <template v-if="getActorType()==ACTORS.CLIENT && item.status=='CLOSED'">
            <custom-footer>
               <button type="button" v-if="!has_feedback" @click="$router.push('/ticket/' + $route.params.id + '/give-feedback')" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
                  give feedback
               </button>

               <button type="button" v-if="has_feedback" @click="$router.push('/ticket/' + $route.params.id + '/feedback')" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
                  see feedback
               </button>
            </custom-footer>
         </template>
      </div>
      `
});
