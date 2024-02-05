import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv( );
console.log("REACT API HOST :",process.env.REACT_APP_API_HOST);
console.log("REACT API PORT :",process.env.REACT_APP_API_PORT);
const config = {
  // apiBasePath: 'http://localhost:80' ,
  apiBasePath: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` ,

};

export default config;