pages.add('feedback', '/ticket/:id/feedback', {

   components: {
      'custom-header': ui.get('custom-header')
   },

   data(){
      return {
         ticket_id: undefined,
         item: {}
      };
   },

   mounted(){
      this.ticket_id = this.$route.params.id;
      this.load();
   },

   methods: {

      getActorType(){
         return cache.getActor().type;
      },

      load(){
         // *Getting the feedback data:
         fetch(this.getActorType()==ACTORS.CLIENT ? '/api/v1/clients/tickets/' + this.ticket_id + '/feedback' : '/api/v1/operators/tickets/' + this.ticket_id + '/feedback', {
               headers: new HeadersBuilder().addAccess().get()
            })
            // *Parsing the response body:
            .then(res => res.json())
            // *Updating the view:
            .then(item => this.item = item)
            // *Logging errors:
            .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      }

   },

   template:
      `
      <div class="feedback-page content-page">

         <custom-header title="Feedback"></custom-header>

         <div class="content-wrapper">

            <div class="content">

               <label class="x-labeled-output">
                  <span class="x-label">Has the ticket been solved?</span>
                  <span class="feedback-solved-label -card" :data-solved="item.solved?'true':'false'">{{ item.solved ? 'Yes' : 'No' }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Service quality</span>
                  <span class="feedback-rating-label -card" :data-rating="item.rating">{{ item.rating!==undefined ? ticket_rating.numberToText(item.rating) : '' }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Aditional feedback</span>
                  <span class="feedback-message-label -card">{{ item.message ? item.message : 'No aditional feedback' }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Sent at</span>
                  <span class="x-datetime-label -card">
                     <span class="x-time">{{ new Date(item.date).toLocaleTimeString(LOCALE) }}</span>
                     <span class="x-date">{{ new Date(item.date).toLocaleDateString(LOCALE) }}</span>
                  </span>
               </label>

            </div>

         </div>

      </div>
      `
});
