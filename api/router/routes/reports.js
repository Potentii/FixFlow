// *Requiring errors module:
const errors = require('../errors.js');



// *Exporting the routes:
module.exports = knex => {



   /**
    * Generates a report
    *  Does requires access authentication
    */
   function generate(req, res, next){
      // *Generating the reports:
      knex.schema.raw('CALL ??()', ['generate_reports'])
         .then(result => {
            // *Building the reports data to be sent:
            const reports = {
               tickets_qty:   result[0][0][0].tickets_qty,
               status_result: result[0][1],
               feedbacks_qty: result[0][2][0].feedbacks_qty,
               rating_result: result[0][3],
               sla_result:    result[0][4][0]
            };

            // *Sending a '200 OK' response, with the report data:
            res.status(200).json(reports).end();
         })
         .catch(err => errors.send(res, err));
   }



   // *Returning the routes available:
   return {
      generate
   };

};
