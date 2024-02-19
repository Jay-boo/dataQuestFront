import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv( );
console.log("---------------GET CONFIG----------------");
console.log("REACT API HOST :",process.env.REACT_APP_API_URL);
console.log("REACT API PORT :",process.env.REACT_APP_API_PORT);
const config = {
  // apiBasePath: 'http://localhost:80' ,
  apiBasePath: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}` ,

};
console.log("config : ",apiBasePath);

export default config;
