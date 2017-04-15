pages.add('index', '/', {

   components: {
      'ticket-list': ui.get('ticket-list'),
      'custom-header': ui.get('custom-header')
   },

   template:
      `
      <div class="index-page">
         <custom-header title="Tickets"></custom-header>
         <div>
            <ticket-list></ticket-list>
         </div>
      </div>
      `
});
