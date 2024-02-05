import { Button  } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../styles/login.css';
import React from 'react';
import FastAPIClient from '../client';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import styled from '@emotion/styled';
import { Navigate } from 'react-router-dom';

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
            this.setState({isLoggedIn:true})
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
    client.login(this.state.loginForm.email,this.state.loginForm.password);
    this.setState({isLoggedIn:true})
  }
  onLogout=(e)=>{
    console.log('logout()');
    client.logout();
    this.setState({isLoggedIn:false})

  }
  

  render(){
    let login_form=<div id="login-form"></div>;
    if (!this.state.isLoggedIn){
          login_form=(
          <div id="login-form">

          <StyledTextField fontColor="#060522" id="outlined-basic" label="email" variant="outlined" 
          onChange={this.handleInputChange('email')}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }} />
          <StyledTextField fontColor="#060522" id="outlined-basic" label="Password" variant="outlined" type='password' 
          onChange={this.handleInputChange('password')}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon></KeyIcon>
                </InputAdornment>
              ),}}
          />
            <Button variant="outlined" onClick={(e)=> this.onLogin(e)} > Submit </Button> 
            or Create Account
          </div>);

    }else{
        // console.log('get user info ');
        // console.log(client.get_user_information());
      // const firstname_user=client.fetchUser();
      // console.log('EHE');
      // console.log(firstname_user)
      login_form=(
      <div id="login-form"> 
       {/* Welcome {firstname_user}  */}
        <Button variant="outlined" onClick={(e)=> this.onLogout(e)} > Log out </Button> 
      </div>);
    }
    





    return(
      <div id="login-container" >
        <h2>Login Page</h2>
          {login_form}
        {this.state.isNavigateOnLogin&& <Navigate to="/" replace={true}></Navigate>}
      </div>
    )
  }

}
// class Login extends React.Component{


export default Login;


