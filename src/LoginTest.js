import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../styles/login.css';
import React, { useState } from 'react';
import FastAPIClient from '../client';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

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

function Login() {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (field) => (event) => {
    setLoginForm({
      ...loginForm,
      [field]: event.target.value
    });
  }

  const onLogin = (e) => {
    console.log('login()');
    client.login(loginForm.email, loginForm.password)
      .then(userInfo => {
        console.log('User Info on Logging', userInfo);
        setIsLoggedIn(true);
        setUserInfo(userInfo);
        console.log("Navigate Now")
        window.location.href="/"
        // navigate('/');
      })
      .catch(error => {
        console.error('Error during login', error);
      });
  }

  const onLogout = (e) => {
    console.log('logout()');
    client.logout();
    setIsLoggedIn(false);
  }

  let login_form;
  if (!isLoggedIn) {
    login_form = (
      <div id="login-form">
        <StyledTextField fontColor="#060522" id="outlined-basic" label="email" variant="outlined"
          onChange={handleInputChange('email')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }} />
        <StyledTextField fontColor="#060522" id="outlined-basic" label="Password" variant="outlined" type='password'
          onChange={handleInputChange('password')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon></KeyIcon>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined" onClick={onLogin} > Submit </Button>
        or <Link to="/signup">Create Account</Link>
      </div>
    );

  } else {
    login_form = (
      <div id="login-form">
        Welcome {userInfo.email}
        <Button variant="outlined" onClick={onLogout} > Log out </Button>
      </div>
    );
  }

  return (
    <div id="login-container" >
      <h2>Login Page</h2>
      {login_form}
    </div>
  );
}

export default Login;
