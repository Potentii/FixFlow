pages.add('index', '/', {

   components: {
      'custom-header': ui.get('custom-header'),
      'ticket-list': ui.get('ticket-list'),
      'custom-footer': ui.get('custom-footer')
   },

   methods: {
      getActorType(){
         return cache.getActor().type;
      }
   },

   template:
      `
      <div class="index-page content-page">

         <custom-header title="Tickets" :subtitle="getActorType()==ACTORS.OPERATOR ? 'on your department' : 'that you\\\'ve opened'"></custom-header>

         <div class="content-wrapper">
            <ticket-list class="content"></ticket-list>
         </div>


         <custom-footer>
            <button type="button" v-if="getActorType()==ACTORS.CLIENT" @click="$router.push('/new-ticket')" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
               + new ticket
            </button>
            <button type="button" v-if="getActorType()==ACTORS.OPERATOR" @click="$router.push('/reports')" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
               reports
            </button>
         </custom-footer>


      </div>
      `
});
