import config from './config';
import jwtDecode from 'jwt-decode';
import axios from 'axios';



class FastAPIClient {
  constructor(overrides) {
    this.config = {
      ...config,
      ...overrides,
    };
    this.authToken = config.authToken;
    this.login = this.login.bind(this);
    this.apiClient = this.getApiClient(this.config);
  }

  /* ----- Authentication & User Operations ----- */

  /* Authenticate the user with the backend services.
   * The same JWT should be valid for both the api and cms */
  login(username, password) {
    delete this.apiClient.defaults.headers['Authorization'];

    // HACK: This is a hack for scenario where there is no login form
    // console.log("----------------LOGIN------------")
    const form_data = new FormData();
    const grant_type = 'password';
    const item = { grant_type, username, password };
    for (const key in item) {
      form_data.append(key, item[key]);
    }

    // console.log("---------------- END LOGIN => fetch ------------")
    return this.apiClient
      .post('/token', form_data)
      .then((resp) => {
        localStorage.setItem('token', JSON.stringify(resp.data));
        return this.fetchUser();
      });
  }



  fetchUser() {
    return this.apiClient.get('/user/me').then(({ data }) => {

      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });
  }

  async getQuest(){
    return this.apiClient.get("/user/quests").then(
      ({data})=> {
        console.log("getQuest()",data);
        return data;}
    )
  }
  async getQuestById(id){
    return this.apiClient.get(`/quest/${id}`).then(
      ({data})=> {
        console.log("getQuestById()",data);
        return data;}
    )
  }
  async getQuestQuestion(quest_id){
    return this.apiClient.get(`/user/quest/${quest_id}/question/`).then(
      ({data})=>{
        return {data,error:null};
      }
    ).catch(
      error =>{
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error here
          console.error("Unauthorized access:", error);
          return { data: null, error: 401 }; // Returning null data and 401 error
        } else {
          // Handle other errors
          throw error; // Re-throw the error to be caught by the caller
        }
      }

    )
  }
  async getQuestOtherQuestion(quest_id,step_number){
    return this.apiClient.get(`/user/quest/${quest_id}/question/${step_number}`).then(
      ({data})=>{
        return {data,error:null};
      }
    ).catch(
      error =>{
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error here
          console.error("Unauthorized access:", error);
          return { data: null, error: 401 }; // Returning null data and 401 error
        } else {
          // Handle other errors
          throw error; // Re-throw the error to be caught by the caller
        }
      }

    )
  }

  async validate(){
    return this.apiClient.get(`/user/quest/question/verify`).then(
      ({data})=>{
        return {data,error:null}
      }
    ).catch(
      error=>{
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error here
          console.error("Unauthorized access:", error);
          return { data: null, error: 401 }; // Returning null data and 401 error
        } else {
          // Handle other errors
          throw error; // Re-throw the error to be caught by the caller
        }

      }
    )
  }
  async getValidateInfo(){
    return this.apiClient.get(`/user/quest/question/verifywithoutpass`).then(
      ({data})=>{
        return {data,error:null}
      }
    ).catch(
      error=>{
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error here
          console.error("Unauthorized access:", error);
          return { data: null, error: 401 }; // Returning null data and 401 error
        } else {
          // Handle other errors
          throw error; // Re-throw the error to be caught by the caller
        }

      }
    )
  }




  // Logging out is just deleting the jwt.
  logout() {
    // Add here any other data that needs to be deleted from local storage
    // on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }


  get_user_information(){
    return this.apiClient.get('/user/me').then(
      ({data})=> {return {"email":data.email,"firstname":data.firstname,"lastname":data.lastname};}
    )
  }

  register(firstname,lastname,email,password){
    const data={
      "firstname":firstname,
      "lastname":lastname,
      "email":email,
      "password":password
    };
    return this.apiClient.post("/user",data).then(
      (resp)=>{
        // console.log("resp :",resp.data);
        return resp.data;
      }
    )
  }








  /* ----- Client Configuration ----- */

  /* Create Axios client instance pointing at the REST api backend */
  getApiClient(config) {
    const initialConfig = {
      baseURL: `${config.apiBasePath}`,
    };
    // console.log(initialConfig)

    // console.log("-------------In get api fct-----------------------");
    const client = axios.create(initialConfig);
    // client.get("/").then((resp) => console.log(resp.data));

    client.interceptors.request.use(localStorageTokenInterceptor);
    // client.get("").then((resp) => console.log(resp));
    // console.log("exit get api fct")
    return client;
  }
}


// every request is intercepted and has auth header injected.
function localStorageTokenInterceptor(config) {
  // console.log("localStorageTokenInterceptor");
  const headers = {};
  const tokenString = localStorage.getItem('token');


  if (tokenString) {
    const token = JSON.parse(tokenString);
    const isAccessTokenValid =
      JSON.stringify(token) !== JSON.stringify({ error: "invalid credentials" });
    if (isAccessTokenValid) {
      const decodedAccessToken = jwtDecode(token.access_token);
      headers['Authorization'] = `Bearer ${token.access_token}`;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('Your login session has expired');
    }
  }
  config['headers'] = headers;
  return config;
}

export default FastAPIClient;
