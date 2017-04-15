const cache = (function(){
   /**
    * The local storage items name
    * @readonly
    * @type {object}
    */
   const KEYS = Object.freeze({
      ACCESS_USER: 'au',
      ACCESS_KEY: 'ak',
      ACTOR_ID: 'ai',
      ACTOR_TYPE: 'at'
   });

   function getAccess(){
      return {
         user: localStorage.getItem(KEYS.ACCESS_USER) || '',
         key: localStorage.getItem(KEYS.ACCESS_KEY) || ''
      };
   }

   function setAccess(user='', key=''){
      localStorage.setItem(KEYS.ACCESS_USER, user);
      localStorage.setItem(KEYS.ACCESS_KEY, key);
   }

   function hasAccess(){
      const access = getAccess();
      return access.user && access.key;
   }

   function getActor(){
      return {
         id: localStorage.getItem(KEYS.ACTOR_ID) || '',
         type: localStorage.getItem(KEYS.ACTOR_TYPE) || ''
      };
   }

   function setActor(id='', type=''){
      localStorage.setItem(KEYS.ACTOR_ID, id);
      localStorage.setItem(KEYS.ACTOR_TYPE, type);
   }

   function hasActor(){
      const actor = getActor();
      return actor.id && actor.type;
   }

   // *Returning this module:
   return Object.freeze({
      getAccess,
      setAccess,
      hasAccess,

      getActor,
      setActor,
      hasActor
   });

})();
