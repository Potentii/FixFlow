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
      // *Getting the ticket id from the url:
      this.id = this.$route.params.id;
      // *Loading the data:
      this.load();
   },

   methods: {

      getActorType(){
         // *Returning the current user's actor type (i.e. client/operator):
         return cache.getActor().type;
      },



      load(){
         // *Getting the ticket data:
         fetch(this.getActorType()==ACTORS.CLIENT ? '/api/v1/clients/tickets/' + this.id : '/api/v1/operators/tickets/' + this.id, {
               headers: new HeadersBuilder().addAccess().get()
            })
            .then(res => {
               // *Checking the response status:
               switch(res.status){
                  case 200:
                     // *If everything went fine:
                     // *Parsing the response body:
                     return res.json()
                        .then(item => {
                           // *Update feedback button view:
                           this.updateFeedbackButton();
                           // *Updating the view:
                           this.item = item;
                        });
                  case 500:
                     // *If other error happened:
                     // *Showing an error snack:
                     snack.error('The server couldn\'t proccess your request', snack.LONG);
                     // *Throwing an error:
                     throw new Error('server error');
               }
            })
            // *Logging errors:
            .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      },



      updateFeedbackButton(){
         // *Getting the feedback data:
         fetch(this.getActorType()==ACTORS.CLIENT ? '/api/v1/clients/tickets/' + this.id + '/feedback' : '/api/v1/operators/tickets/' + this.id + '/feedback', {
               headers: new HeadersBuilder().addAccess().get()
            })
            .then(res => {
               // *Checking the response status:
               switch(res.status){
                  case 200:
                     // *If a feedback has been found:
                     // *Updating the view:
                     this.has_feedback = true;
                     break;
                  default:
                     // *If no feedback has been found:
                     // *Updating the view:
                     this.has_feedback = false;
               }
            })
            // *Logging errors:
            .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      },



      advanceStatus(){
         // *Advancing the ticket status:
         fetch('/api/v1/operators/tickets/' + this.id + '/status/advance', {
               headers: new HeadersBuilder().addAccess().get()
            })
            .then(res => {
               // *Checking the response status:
               switch(res.status){
               case 200:
                  // *If everything went fine:
                  // *Showing a snack:
                  snack.show('Ticket status changed', snack.SHORT);
                  // *Updating the view:
                  this.load();
                  break;
               default:
                  // *If other error happened:
                  // *Showing an error snack:
                  snack.error('The server couldn\'t proccess your request', snack.LONG);
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
                  <span class="x-label">Status</span>
                  <span class="ticket-status-label -card" :data-status="item.status">{{ TICKET_STATUS.getText(item.status) }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Urgency</span>
                  <span class="ticket-urgency-label -card" :data-urgency="item.urgency">
                     <i class="material-icons">whatshot</i>
                     <span>{{ TICKET_URGENCY.getText(item.urgency) }}</span>
                  </span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Title</span>
                  <span class="-card">{{ item.title }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Description</span>
                  <span class="ticket-description-label -card">{{ item.description }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Opening date</span>
                  <span class="x-datetime-label -card">
                     <span class="x-time">{{ new Date(item.date_opened).toLocaleTimeString(LOCALE) }}</span>
                     <span class="x-date">{{ new Date(item.date_opened).toLocaleDateString(LOCALE) }}</span>
                  </span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Closing date</span>
                  <span class="x-datetime-label -card">
                     <span class="x-time" v-if="item.date_closed">{{ new Date(item.date_closed).toLocaleTimeString(LOCALE) }}</span>
                     <span class="x-date" v-if="item.date_closed">{{ new Date(item.date_closed).toLocaleDateString(LOCALE) }}</span>
                     <span v-if="!item.date_closed">Not closed yet</span>
                  </span>
               </label>

            </div>

         </div>

         <template v-if="getActorType()==ACTORS.OPERATOR && (item.status=='PENDING' || item.status=='SOLVING' || has_feedback)">
            <custom-footer>
               <button v-if="item.status=='PENDING'" type="button" @click="advanceStatus" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
                  set as solving
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
