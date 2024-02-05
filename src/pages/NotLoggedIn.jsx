import React from "react";
import { Link } from "react-router-dom";
import errorLogo from "./../resources/error_icon.svg";

export const NotLoggedIn = () =>
  <div style={{marginTop:'5%'}}>
    <div className="notfound text-white">
    <div className="notfound-404">
    <img src={errorLogo} className="App-logo" alt="logo" />

        <h1 className="mt-4">Oops!</h1>
        <h2>Login To Access The Page</h2>
      </div>
      <Link to="/login" className="rounded" >Go to login</Link>
    </div>
  </div>
export default NotLoggedIn;