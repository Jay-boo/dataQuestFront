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
import errorLogo from "./../resources/error_icon.svg";
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


class ErrorMessage extends React.Component {
  render() {
    const { hasError,counter } = this.props;
    console.log('render ErrorMessage',hasError,counter);
    return (
      <span key={counter} className={`errorMessage ${hasError ? 'error-message' : ''}`}>
        {this.props.children}
      </span>
    );
  }
}


const client=new FastAPIClient();
class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signupForm:{'firstname':'','lastname':'','email':'','password':''},
            errorCounter:0,
            isCreated:false,
            firstnameError:false,
            lastnameError:false,
            emailError:false,
            passwordError:false,
            generalError:null
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
        ).catch(error=>{
        console.log("Creation failed",error,error.response.status);
        this.setState((prevState)=>({errorCounter:prevState.errorCounter+1}));
        if (error.response.status==422){
          // CASE : Missing field
          let missingFields={'firstname':false,'lastname':false,"email":false,"password":false}
          error.response.data.detail.map((error,index)=>{
            if (error.loc=='password'){missingFields.password=true}
            else if (error.loc=='email'){missingFields.email=true}
            else if (error.loc=='firstname'){missingFields.firstname=true}
            else if (error.loc=='lastname'){missingFields.lastname=true}
          })
          let true_keys=Object.keys(missingFields).filter(key=>missingFields[key]);
          console.log('true key',true_keys);
          let _error_msg=true_keys.join(", ");
          console.log("error msg : ",_error_msg);
          this.setState({
            emailError:missingFields.email,
            passwordError:missingFields.password,
            firstnameError:missingFields.firstname,
            lastnameError:missingFields.lastname,
            generalError:_error_msg+ ` missing field${true_keys.length>0 ? "s":""}`
          })
        }
        else if (error.response.status=400){
          // CASE :  user already exist/ invalid email
          let missingFields={'firstname':false,'lastname':false,"email":false,"password":false}
          let _error_msg=""
          error.response.data.detail.map((error,index)=>{
            if (error.loc=='password'){missingFields.password=true}
            else if (error.loc=='email'){missingFields.email=true}
            else if (error.loc=='firstname'){missingFields.firstname=true}
            else if (error.loc=='lastname'){missingFields.lastname=true}
            _error_msg=error.msg
          })
          this.setState({
            emailError:missingFields.email,
            passwordError:missingFields.password,
            firstnameError:missingFields.firstname,
            lastnameError:missingFields.lastname,
            generalError:_error_msg })


        }
      }

      )
        client.logout();

  }

    render(){
        console.log('render state signUp',this.state);
        let error_message=null;
        if (this.state.generalError != null) {
          error_message = (
            <div id="container-errorLogs-signup">
              <img src={errorLogo} className="App-logo" alt="logo" />
              <ErrorMessage key={this.state.errorCounter} hasError={true} className='errorMessage'>{this.state.generalError}</ErrorMessage>
            </div>
          );
        }
    
    
        let signupForm=(<div id='signup-form'>
          <StyledTextField error={this.state.firstnameError}fontColor="#060522" id="outlined-basic" label="first name" variant="outlined" 
          onChange={this.handleInputChange('firstname')}style={{margin:"10px"}}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }} />
          <StyledTextField error={this.state.lastnameError}fontColor="#060522" id="outlined-basic" label="last name" variant="outlined" 
          onChange={this.handleInputChange('lastname')} style={{margin:"10px"}}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }} />
          <StyledTextField error={this.state.emailError}fontColor="#060522" id="outlined-basic" label="email" variant="outlined" 
          onChange={this.handleInputChange('email')} style={{margin:"10px"}}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                    <EmailIcon/>
                </InputAdornment>
              ),
            }} />
          <StyledTextField error={this.state.passwordError} fontColor="#060522" id="outlined-basic" label="Password" variant="outlined" type='password' 
          onChange={this.handleInputChange('password')} style={{margin:"10px"}}
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon></KeyIcon>
                </InputAdornment>
              ),}}
          />
            <Button variant="contained"  style={{margin:"10px"}} onClick={(e)=> this.onCreate(e)} > Create </Button> 
      {error_message}






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
