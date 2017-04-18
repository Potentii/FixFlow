pages.add('new-ticket', '/new-ticket', {

   components: {
      'custom-header': ui.get('custom-header'),
      'custom-footer': ui.get('custom-footer')
   },

   data(){
      return {
         title: undefined,
         urgency: 'LOW',
         description: undefined,
         category: undefined,

         categories: []
      };
   },

   mounted(){
      // *Loading the available categories:
      this.fetchCategories();
   },

   methods: {

      submit(){
         // *Building the data to be sent:
         const data = {
            title: this.title,
            urgency: this.urgency,
            description: this.description,
            category_fk: this.category.id
         };

         // *Trying to create the ticket:
         fetch('/api/v1/clients/tickets', {
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
                        // TODO show a snack
                        // *Sending the user to the ticket view page:
                        this.$router.replace('/ticket/' + info.id);
                     });
               case 400:
                  // *If some input was incorrect:
                  // TODO show a snack
                  // *Throwing an error:
                  throw new Error('invalid data');
               default:
                  // *If other error happened:
                  // TODO show a snack
                  // *Throwing an error:
                  throw new Error('server error');
            }
         })
         // *Logging errors:
         .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      },

      fetchCategories(){
         // *Getting all the available categories from server:
         fetch('/api/v1/categories')
            // *Parsing the response body:
            .then(res => res.json())
            // *Updating the view:
            .then(items => this.categories = items)
            // *Logging errors:
            .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      }

   },

   template:
      `
      <div class="new-ticket-page content-page">

         <custom-header title="Create" subtitle="a new ticket"></custom-header>

         <div class="content-wrapper">
            <form id="new-ticket-page-form" class="content" @submit.prevent="submit">

               <label class="new-ticket-page-form-title mdc-textfield" data-mdc-auto-init="MDCTextfield">
                  <input type="text" class="mdc-textfield__input" v-model="title" required>
                  <span class="mdc-textfield__label">Title</span>
               </label>

               <div class="new-ticket-page-form-urgency-group radio-group">
                  <label>Urgency</label>
                  <div class="radio-group-options">
                     <label class="mdc-radio" data-mdc-auto-init="MDCRadio">
                        <input class="mdc-radio__native-control" type="radio" value="LOW" v-model="urgency" name="urgency-radio" checked>
                        <div class="mdc-radio__background">
                           <div class="mdc-radio__outer-circle"></div>
                           <div class="mdc-radio__inner-circle"></div>
                        </div>
                        <span class="mdc-radio__label">Low</span>
                     </label>

                     <label class="mdc-radio" data-mdc-auto-init="MDCRadio">
                        <input class="mdc-radio__native-control" type="radio" value="MEDIUM" v-model="urgency" name="urgency-radio">
                        <div class="mdc-radio__background">
                           <div class="mdc-radio__outer-circle"></div>
                           <div class="mdc-radio__inner-circle"></div>
                        </div>
                        <span class="mdc-radio__label">Medium</span>
                     </label>

                     <label class="mdc-radio" data-mdc-auto-init="MDCRadio">
                        <input class="mdc-radio__native-control" type="radio" value="HIGH" v-model="urgency" name="urgency-radio">
                        <div class="mdc-radio__background">
                           <div class="mdc-radio__outer-circle"></div>
                           <div class="mdc-radio__inner-circle"></div>
                        </div>
                        <span class="mdc-radio__label">High</span>
                     </label>
                  </div>
               </div>

               <div class="new-ticket-page-form-category mdc-select" role="listbox" tabindex="0" data-mdc-auto-init="MDCSelect" required>
                  <span class="mdc-select__selected-text">Category</span>
                  <div class="mdc-simple-menu mdc-select__menu" data-mdc-auto-init="MDCSimpleMenu">
                     <ul class="mdc-list mdc-simple-menu__items">
                        <li class="mdc-list-item" role="option" tabindex="0" @click="category = cat" v-for="cat in categories">
                           {{ cat.name }}
                        </li>
                     </ul>
                  </div>
               </div>

               <label class="new-ticket-page-form-description mdc-textfield mdc-textfield--multiline mdc-textfield--fullwidth" data-mdc-auto-init="MDCTextfield">
                  <textarea class="mdc-textfield__input" rows="3" v-model="description" required></textarea>
                  <span class="mdc-textfield__label">Description</span>
               </label>

            </form>
         </div>

         <custom-footer>
            <button type="submit" form="new-ticket-page-form" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
               send
            </button>
         </custom-footer>

      </div>
      `
});
