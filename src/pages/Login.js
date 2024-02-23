import { Button  } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../styles/login.css';
import React from 'react';
import FastAPIClient from '../client';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import styled from '@emotion/styled';
import { Link,} from 'react-router-dom';
import errorLogo from "./../resources/error_icon.svg";

const jwtDecode = require("jwt-decode");
const options = {
  shouldForwardProp: (prop) => prop !== 'fontColor',
};
const StyledTextField = styled(
  TextField,
  options,
)(({ fontColor }) => ({
  input: {
    color: fontColor,
  },
}));
const client=new FastAPIClient();




class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      loginForm:{'email':'','password':''},
      isLoggedIn:false,
      userInfo:{},
      generalError:null,
      emailError:false,
      passwordError:false

    }
  }

  componentDidMount(){
    console.log('componentDidMount');
    const tokenString=localStorage.getItem("token");
    if (tokenString){
        const token=JSON.parse(tokenString);
        console.log(JSON.stringify(token));
        const isValid=JSON.stringify(token)!= JSON.stringify({error:"invalid credentials"});
        console.log("Is token valid ?",isValid);
        if (isValid){
            this.setState({isLoggedIn:true});
            client.get_user_information().then(
              userInfo =>{
                this.setState({userInfo:userInfo})
              }
            )
            
        }
        }
  }



  handleInputChange=(field)=>(event)=>{
    this.setState({
      loginForm:{
        ...this.state.loginForm,
        [field]:event.target.value
      }
    })
  }

  onLogin=(e)=>{
    console.log('login()');
    client.login(this.state.loginForm.email,this.state.loginForm.password).then(
      userInfo=>{
        console.log('User Info on Logging',userInfo);
        this.setState({
          isLoggedIn:true,
          userInfo:userInfo,
          emailError:false,
          passwordError:false
        
        });
        window.location.href="/"
      }
    ).catch(error=>{
      console.log('Login Failed',error);
      // alert('Login failed: '  ); 
      console.log(error.response.data.detail)
      let missingField={'password':false,'username':false}
      error.response.data.detail.map((error,index)=>{
      
        console.log(index,error)
        if (error.msg=="Field required" ){
          console.log("loc",error.loc[1])
          if (error.loc[1]=="username"){
            missingField.username=true
          }else if(error.loc[1]=="password"){
            missingField.password=true
            }
          let generalErrorMessage=null
          if (missingField.password && missingField.username){
            generalErrorMessage="Multiple missing fields"

          }else if(missingField.password){generalErrorMessage="Password field missing"}
          else if(missingField.username){generalErrorMessage="Email field missing"}
          this.setState({
            emailError:missingField.username,
            passwordError:missingField.password,
            generalError:generalErrorMessage
          })
        }
        })
      // this.setState({onLoginErrors:["Hello World"]});
    })
  }

  onLogout=(e)=>{
    console.log('logout()');
    client.logout();
    this.setState({isLoggedIn:false})
  }
  

  render(){
    console.log('render state',this.state)
    let login_form=<div id="login-form"></div>;
    if (!this.state.isLoggedIn){
          login_form=(
          <div id="login-form">

          <StyledTextField error={this.state.emailError} fontColor="#060522" id="outlined-basic" label="email" variant="outlined" 
          onChange={this.handleInputChange('email')}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                <EmailIcon/>
                </InputAdornment>
              ),
            }} />
          <StyledTextField  error={this.state.passwordError} fontColor="#060522" id="outlined-basic" label="Password"  variant="outlined" type='password' 
          onChange={this.handleInputChange('password')} style={{margin:"10px"}}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon></KeyIcon>
                </InputAdornment>
              ),}}
           />
            <Button variant="outlined" onClick={(e)=> this.onLogin(e)} > Submit </Button> 
            or <Link to="/signup">Create Account</Link>
            {this.state.generalError!=null &&
  <div id="container-errorLogs">

    <img src={errorLogo} className="App-logo" alt="logo" />
    <span className='errorMessage'>{this.state.generalError}</span>
    {/* {this.state.onLoginErrors.map((error, index) => (
      <span key={index} className='errorMessage'>{error}</span>
    ))} */}
  </div>
}
            
          </div>);

    }else{
      login_form=(
      <div id="login-form"> 
       <span>Bienvenue {this.state.userInfo.email} !</span>
        <Button variant="outlined" onClick={(e)=> this.onLogout(e)}  > Log out </Button> 
      </div>);
    }

    return(
      <div id="login-container" >
        <h2>Login </h2>
          {login_form}
      </div>
    )
  }

}


export default Login;


