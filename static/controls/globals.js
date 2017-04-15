/**
 * The available environment modes
 * @readonly
 * @type {object}
 */
const ENVS = Object.freeze({
   DEV: 'dev',
   PROD: 'prod'
});


const ACTORS = Object.freeze({
   CLIENT: 'client',
   OPERATOR: 'operator'
});


/**
 * The credentials headers name
 * @readonly
 * @type {object}
 */
const CREDENTIAL_HEADERS = Object.freeze({
   USER: 'Credential-User',
   PASS: 'Credential-Pass'
});



/**
 * The access headers name
 * @readonly
 * @type {object}
 */
const ACCESS_HEADERS = Object.freeze({
   USER: 'Access-User',
   KEY: 'Access-Key'
});
