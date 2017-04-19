const ticket_rating = (function(){
   const ratings = new Map();

   ratings.set(0, 'Very bad');
   ratings.set(1, 'Bad');
   ratings.set(2, 'Satisfied');
   ratings.set(3, 'Good');
   ratings.set(4, 'Excelent');

   function numberToText(n){
      return ratings.get(n);
   }

   function asArray(){
      const arr = [];
      ratings.forEach((v, k) => arr.push({ number: k, text: v }));
      return arr;
   }

   // *Exporting this module:
   return { numberToText, asArray };
})();
