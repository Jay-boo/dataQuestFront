import React from 'react';
import { Button  } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import FastAPIClient from '../client';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import '../styles/SignUp.css';
import { Navigate } from 'react-router-dom';

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
class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signupForm:{'firstname':'','lastname':'','email':'','password':''},
            isCreated:false
        }
    }
  handleInputChange=(field)=>(event)=>{
    this.setState({
      signupForm:{
        ...this.state.signupForm,
        [field]:event.target.value
      }
    })
  }
  onCreate=(e)=>{
    console.log('On Create');
    client.register(this.state.signupForm.firstname,
        this.state.signupForm.lastname,
        this.state.signupForm.email,
        this.state.signupForm.password
        ).then(
            (resp)=>{
                this.setState({isCreated:true})
            } 
        )
        client.logout();

  }

    render(){
        let signupForm=(<div id='signup-form'>
          <StyledTextField fontColor="#060522" id="outlined-basic" label="first name" variant="outlined" 
          onChange={this.handleInputChange('firstname')}style={{margin:"10px"}}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }} />
          <StyledTextField fontColor="#060522" id="outlined-basic" label="last name" variant="outlined" 
          onChange={this.handleInputChange('lastname')} style={{margin:"10px"}}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }} />
          <StyledTextField fontColor="#060522" id="outlined-basic" label="email" variant="outlined" 
          onChange={this.handleInputChange('email')} style={{margin:"10px"}}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                    <EmailIcon/>
                </InputAdornment>
              ),
            }} />
          <StyledTextField fontColor="#060522" id="outlined-basic" label="Password" variant="outlined" type='password' 
          onChange={this.handleInputChange('password')} style={{margin:"10px"}}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon></KeyIcon>
                </InputAdornment>
              ),}}
          />
            <Button variant="contained"  style={{margin:"10px"}} onClick={(e)=> this.onCreate(e)} > Create </Button> 






        </div>);
        return(
        <div id="signup-container">
            <h2> Create Account</h2>
            {signupForm}
            {this.state.isCreated && <Navigate to="/login" replace={true}></Navigate>}
        </div>);
    }

}

export default SignUp;