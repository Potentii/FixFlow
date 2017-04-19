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
                  <span class="x-label">Ticket response time (average)</span>
                  <span class="reports-sla-avg-hours">{{ reports.sla_result ? decimalHoursToFormat(reports.sla_result.avg_response_hours, '%Hh %Mmin') : '' }}</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Tickets status</span>
                  <ul class="reports-status-list" v-if="reports.status_result && reports.status_result.length">
                     <li v-for="status_info in reports.status_result" :data-status="status_info.status">
                        <span>{{ TICKET_STATUS.getText(status_info.status) }}</span>
                        <span>{{ (100 * status_info.tickets_qty / reports.tickets_qty).toFixed(1) }}%</span>
                     </li>
                  </ul>
                  <span v-else>No tickets have been created yet</span>
               </label>

               <label class="x-labeled-output">
                  <span class="x-label">Service ratings</span>
                  <ul class="reports-rating-list" v-if="reports.rating_result && reports.rating_result.length">
                     <li v-for="rating_info in reports.rating_result" :data-rating="rating_info.rating">
                        <span>{{ ticket_rating.numberToText(rating_info.rating) }}</span>
                        <span>{{ (100 * rating_info.feedbacks_qty / reports.feedbacks_qty).toFixed(1) }}%</span>
                     </li>
                  </ul>
                  <span v-else>No tickets have been rated yet</span>
               </label>

            </div>

         </div>
      </div>
      `
});
