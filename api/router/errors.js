
/**
 * Logs the error on console and sends a 500 response to client
 * @param  {obejct} res The Expressjs response obejct
 * @param  {Error} err  The error to be logged
 */
function send(res, err){
   // *Logging the error:
   console.error(err);
   // *Sending the error response:
   res.status(500).end();
}



// *Exporting this module:
module.exports = { send };
