/**
 * The available environment modes
 * @readonly
 * @type {object}
 */
const ENVS = Object.freeze({
   DEV: 'dev',
   PROD: 'prod'
});



const LOCALE = 'pt-BR';



const ACTORS = Object.freeze({
   CLIENT: 'client',
   OPERATOR: 'operator'
});



const TICKET_STATUS = Object.freeze({
   PENDING: 'PENDING',
   SOLVING: 'SOLVING',
   CLOSED: 'CLOSED',

   /**
    * Retrives the human readable version of a given status
    * @param  {string} status The status to be converted
    * @return {string}        The text
    */
   getText(status){
      switch(status){
         case this.PENDING: return 'Pending';
         case this.SOLVING: return 'Solving';
         case this.CLOSED: return 'Closed';
      }
      return '';
   }
});



const TICKET_URGENCY = Object.freeze({
   LOW: 'LOW',
   MEDIUM: 'MEDIUM',
   HIGH: 'HIGH',

   /**
    * Retrives the human readable version of a given urgency
    * @param  {string} urgency The urgency to be converted
    * @return {string}        The text
    */
   getText(urgency){
      switch(urgency){
         case this.LOW: return 'Low';
         case this.MEDIUM: return 'Medium';
         case this.HIGH: return 'High';
      }
      return '';
   }
});



const pad1Right = v => v<10 ? v+'0' : v+'';



function decimalHoursToFormat(decimal_hours, format){
   if(!format || typeof format!=='string')
      throw new Error('format must be a string');

   const hours = Math.floor(Math.abs(decimal_hours));
   const mins = Math.floor((Math.abs(decimal_hours) * 60) % 60);

   return format
      .replace(/%H/g, pad1Right(hours))
      .replace(/%M/g, pad1Right(mins));
}
