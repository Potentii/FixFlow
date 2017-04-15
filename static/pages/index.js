pages.add('index', '/', {
   components: {
      'ticket-list': ui.get('ticket-list')
   },
   methods: {

   },
   template:
      `
      <div>
         <ticket-list></ticket-list>
      </div>
      `
});
