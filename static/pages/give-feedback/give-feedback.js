pages.add('give-feedback', '/ticket/:id/give-feedback', {

   components: {
      'custom-header': ui.get('custom-header'),
      'custom-footer': ui.get('custom-footer')
   },

   data(){
      return {
         ticket_fk: undefined,

         rating: undefined,
         solved: 'true',
         message: undefined
      };
   },

   mounted(){
      this.ticket_fk = this.$route.params.id;
   },

   methods: {

      submit(){
         // *Building the data to be sent:
         const data = {
            rating: this.rating ? this.rating.number : undefined,
            solved: (this.solved==='true') ? true : false,
            message: this.message
         };

         // *Trying to create the ticket:
         fetch('/api/v1/clients/tickets/' + this.ticket_fk + '/feedback', {
            method: 'POST',
            headers: new HeadersBuilder()
               .addAccess()
               .addJSONBody()
               .get(),
            body: JSON.stringify(data)
         })
         .then(res => {
            // *Checking the response status:
            switch(res.status){
               case 201:
                  // *If everything went fine:
                  // *Parsing the response body:
                  return res.json()
                     .then(info => {
                        // *Showing a snack:
                        snack.show('Feedback saved', snack.SHORT);
                        // *Sending the user to the feedback view page:
                        this.$router.replace('/ticket/' + this.ticket_fk);
                     });
               case 400:
                  // *If some input was incorrect:
                  // *Showing an error snack:
                  snack.error('There are some invalid information', snack.LONG);
                  // *Throwing an error:
                  throw new Error('invalid data');
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
      <div class="give-feedback-page content-page">

         <custom-header title="Feedback" subtitle="about the ticket"></custom-header>

         <div class="content-wrapper">
            <form id="give-feedback-page-form" class="content" @submit.prevent="submit">

               <div class="give-feedback-page-form-solved-group radio-group">
                  <label>Has the ticket been solved?</label>
                  <div class="radio-group-options">
                     <label class="mdc-radio" data-mdc-auto-init="MDCRadio">
                        <input class="mdc-radio__native-control" type="radio" value="true" v-model="solved" name="solved-radio" checked>
                        <div class="mdc-radio__background">
                           <div class="mdc-radio__outer-circle"></div>
                           <div class="mdc-radio__inner-circle"></div>
                        </div>
                        <span class="mdc-radio__label">Yes</span>
                     </label>

                     <label class="mdc-radio" data-mdc-auto-init="MDCRadio">
                        <input class="mdc-radio__native-control" type="radio" value="false" v-model="solved" name="solved-radio">
                        <div class="mdc-radio__background">
                           <div class="mdc-radio__outer-circle"></div>
                           <div class="mdc-radio__inner-circle"></div>
                        </div>
                        <span class="mdc-radio__label">No</span>
                     </label>
                  </div>
               </div>

               <div class="radio-group">
                  <label>How do you describe the service quality?</label>
                  <div class="radio-group-options">
                     <div class="give-feedback-page-form-rating mdc-select" role="listbox" tabindex="0" data-mdc-auto-init="MDCSelect" required>
                        <span class="mdc-select__selected-text"></span>
                        <div class="mdc-simple-menu mdc-select__menu" data-mdc-auto-init="MDCSimpleMenu">
                           <ul class="mdc-list mdc-simple-menu__items">
                              <li class="mdc-list-item" role="option" tabindex="0" @click="rating = rv" v-for="rv in ticket_rating.asArray()">
                                 {{ rv.text }}
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>

               <label class="give-feedback-page-form-message mdc-textfield mdc-textfield--multiline mdc-textfield--fullwidth" data-mdc-auto-init="MDCTextfield">
                  <textarea class="mdc-textfield__input" rows="3" v-model="message"></textarea>
                  <span class="mdc-textfield__label">If you want to add something else, we'd love to hear more from you</span>
               </label>

            </form>
         </div>

         <custom-footer>
            <button type="submit" form="give-feedback-page-form" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
               send
            </button>
         </custom-footer>

      </div>
      `
});
