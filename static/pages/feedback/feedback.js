pages.add('feedback', '/ticket/:id/feedback', {

   components: {
      'custom-header': ui.get('custom-header')
   },

   data(){
      return {
         ticket_id: undefined,

         item: {},

         date_local: 'pt-BR',

         rating_values: ['Excelent', 'Good', 'Regular', 'Bad', 'Very bad']
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
                  <span>{{ item.solved ? 'Yes' : 'No' }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Service quality</span>
                  <span>{{ item.rating!==undefined ? rating_values[Number(rating_values.length-1-item.rating)] : '' }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Aditional feedback</span>
                  <span>{{ item.message ? item.message : 'No aditional feedback' }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Sent at</span>
                  <span>{{ new Date(item.date).toLocaleDateString(date_local) }}</span>
                  <span>{{ new Date(item.date).toLocaleTimeString(date_local) }}</span>
               </label>

            </div>

         </div>
         
      </div>
      `
});
