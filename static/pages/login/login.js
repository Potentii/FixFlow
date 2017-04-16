pages.add('login', '/login', {

   data(){
      return {
         cred_check_has_failed: false,
         server_error: false,
         username: undefined,
         password: undefined
      }
   },

   methods: {
      attemptToLogin(){
         // *Resetting the flags:
         cred_check_has_failed = false;
         server_error = false;

         // *Getting the credentials from the model:
         const username = this.username || '';
         const password = this.password || '';

         // *Trying to create a new access:
         fetch('/api/v1/accesses', {
               method: 'POST',
               headers: new HeadersBuilder().addCredentials(username, password).get()
            })
            .then(res => {
               // *Checking the response status:
               switch(res.status){
               case 201:
                  // *If the access creation went ok:
                  // *Parsing the response body:
                  return res.json()
                     .then(({ user, key }) => {
                        // *Saving the access info on cache:
                        cache.setAccess(user, key);

                        // *Sending the user to the main page:
                        this.$router.push('/');
                     });
               case 401:
                  // *If the authentication has failed:
                  // *Setting the flag:
                  cred_check_has_failed = true;
                  break;
               default:
                  // *If some error happened:
                  // *Setting the flag:
                  server_error = true;
               }
            })
            // *Logging errors:
            .catch(err => (ENV!=ENVS.PROD) && console.error(err));
      }
   },

   template:
      `
      <div class="login-page">
         <form @submit.prevent="attemptToLogin">

            <h1>
               Fix Flow
            </h1>

            <label class="mdc-textfield" data-mdc-auto-init="MDCTextfield">
               <input type="text" class="mdc-textfield__input" v-model="username" required>
               <span class="mdc-textfield__label">Username</span>
            </label>

            <label class="mdc-textfield" data-mdc-auto-init="MDCTextfield">
               <input type="password" class="mdc-textfield__input" v-model="password" required>
               <span class="mdc-textfield__label">Password</span>
            </label>

            <button type="submit" class="mdc-button mdc-button--raised mdc-button--accent" data-mdc-auto-init="MDCRipple">
               Login
            </button>

            <span v-if="cred_check_has_failed">Sorry, invalid username and/or password</span>
            <span v-if="server_error">Sorry, the server isn't available right now</span>
         </form>
      </div>
      `
});
