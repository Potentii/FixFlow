#!/usr/bin/env node
'use strict';

// *Requiring the needed modules:
const chalk = require('chalk');

// *Requiring the app module:
const app = require('./controller.js');

// *Setting the finish flag:
let finish_signaled = false;



// *When process is interrupted, finishing the program:
process.on('SIGINT', kill);

// *When the process doesn't have any other task left:
process.on('exit', code => {
   // *Checking if the application has finished with errors:
   if(code>0)
      // *If it has:
      // *Logging it out, in red:
      console.log(chalk.red('Application finished with errors'));
   else
      // *If it hasn't:
      // *Logging it out, in green:
      console.log(chalk.green('Application finished'));
});



// *Starting the app:
app.start()
   .then(info => {
      // *Logging the app information:
      console.log(chalk.blue('Application started @ ' + info.address.href));
   })
   .catch(err => {
      // *If some error happens:
      // *Logging the error:
      console.error(err);
      // *Finishing the app:
      kill(1);
   });



/**
 * Finishes all the services, and then kills the process
 */
function kill(code = 0){
   // *Checking if the finish signal has been set already, returning if it has:
   if(finish_signaled) return;

   // *Setting the finish signal:
   finish_signaled = true;

   // *Finishing the app:
   app.finish()
      // *Stopping the process:
      .then(() => process.exit(code))
      .catch(err => {
         // *If some error happens:
         // *Logging the error:
         console.error(err);
         // *Stopping the process:
         process.exit(1);
      });
}
