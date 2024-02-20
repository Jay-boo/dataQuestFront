import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv( );
console.log("---------------GET CONFIG----------------");
console.log("REACT API HOST :",process.env.REACT_APP_API_URL);
const config = {
  // apiBasePath: 'http://localhost:80' ,
  apiBasePath: `${process.env.REACT_APP_API_URL}` ,

};
console.log("config : ",config);

export default config;
