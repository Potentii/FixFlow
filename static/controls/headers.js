class HeadersBuilder{

   constructor(){
      this._headers = new Map();
      this._HEADERS = Object.freeze({
         ACCESS_USER: 'Access-User',
         ACCESS_KEY: 'Access-Key',
         CREDENTIAL_USER: 'Credential-User',
         CREDENTIAL_PASS: 'Credential-Pass'
      });
   }

   static get HEADERS(){
      return this._HEADERS;
   }

   add(name, value){
      this._headers.set(String(name), String(value));
      return this;
   }

   addAccess(user='', key=''){
      // *Getting the user/key from cache if they aren't set:
      user = !user ? cache.getAccess().user : user;
      key = !key ? cache.getAccess().key : key;

      // *Adding the access headers:
      this.add(this._HEADERS.ACCESS_USER, user);
      this.add(this._HEADERS.ACCESS_KEY, key);
      return this;
   }

   addCredentials(username='', password=''){
      // *Adding the access headers:
      this.add(this._HEADERS.CREDENTIAL_USER, username);
      this.add(this._HEADERS.CREDENTIAL_PASS, password);
      return this;
   }

   addJSONBody(){
      // *Adding the body type header:
      return this.add('Content-Type', 'application/json');
   }

   addAcceptJSON(){
      // *Adding the Accept header:
      return this.add('Accept', 'application/json');
   }

   get(){
      // *Initializing the headers object:
      let headers = {};
      // *Adding the headers on the object:
      this._headers.forEach((v, k) => headers[k] = v);
      // *Returning the headers object:
      return headers;
   }
}
