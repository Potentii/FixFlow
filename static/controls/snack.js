
const snack = (function(){

   const MDCSnackbar = mdc.snackbar.MDCSnackbar;
   let snackbar;

   document.addEventListener('DOMContentLoaded', e => snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar')))

   function show(message, timeout){
      snackbar.show({ message, timeout });
   }

   function error(message, timeout){
      show(message, timeout);
   }

   return {
      SHORT: 4000,
      LONG: 8000,
      show,
      error
   };
})();
