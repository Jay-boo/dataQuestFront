import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv( );
console.log("---------------GET CONFIG----------------");
console.log("REACT API HOST :",process.env.API_URL);
console.log("REACT API PORT :",process.env.API_PORT);
const config = {
  // apiBasePath: 'http://localhost:80' ,
  apiBasePath: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` ,

};

export default config;
