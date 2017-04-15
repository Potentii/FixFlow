pages.add('index', '/', {
   components: {
      'ticket-list': ui.get('ticket-list')
   },
   methods: {

   },
   template:
      `
      <div class="index-page">
         <ticket-list></ticket-list>
      </div>
      `
});
