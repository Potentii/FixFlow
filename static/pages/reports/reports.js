pages.add('reports', '/reports', {

   components: {
      'custom-header': ui.get('custom-header'),
      'custom-footer': ui.get('custom-footer')
   },

   data(){
      return {
         reports: {}
      };
   },

   mounted(){
      this.load();
   },

   methods: {

      load(){

         fetch('/api/v1/reports', {
               headers: new HeadersBuilder().addAccess().get()
            })
            .then(res => {
               switch(res.status){
                  case 200:
                     return res.json()
                        .then(reports => {

                           this.reports = reports;
                        });
                     break;
                  default:
                     throw new Error('server error');
               }
            })
            // *Logging errors:
            .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      }

   },

   template:
      `
      <div class="reports-page content-page">

         <custom-header title="Reports"></custom-header>

         <div class="content-wrapper">

            <div class="content">

               <label class="x-labeled-output">
                  <span class="x-label">Tickets status</span>
                  <ul class="reports-status-list" v-if="reports.status_result && reports.status_result.length">
                     <li v-for="status_info in reports.status_result" :data-status="status_info.status">
                        <span>{{ status_info.status }}</span>
                        <span>{{ 100 * status_info.tickets_qty / reports.tickets_qty }}%</span>
                     </li>
                  </ul>
                  <span v-else>No tickets have been created yet</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Service ratings</span>
                  <ul v-if="reports.rating_result && reports.rating_result.length">
                     <li v-for="rating_info in reports.rating_result">
                        <span>{{ rating_info.rating }}</span>
                        <span>{{ 100 * rating_info.tickets_qty / reports.tickets_qty }}%</span>
                     </li>
                  </ul>
                  <span v-else>No tickets have been rated yet</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Ticket response time (average)</span>
                  <span class="reports-sla-avg-hours">{{ reports.sla_result ? '~' + Math.round(reports.sla_result.avg_response_hours) + 'H' : '' }}</span>
               </label>

            </div>

         </div>
      </div>
      `
});
