import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv( );
console.log("---------------GET CONFIG----------------");
console.log("REACT API HOST :",env.API_URL);
console.log("REACT API PORT :",env.API_PORT);
const config = {
  // apiBasePath: 'http://localhost:80' ,
  apiBasePath: `${env.API_URL}:${env.API_PORT}` ,

};
console.log("config : ",apiBasePath);

export default config;
