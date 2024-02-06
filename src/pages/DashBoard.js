import React from "react";
import DashBoardComponent from "../components/DashBoardComponent"
import Login from '../pages/Login';
import '../styles/DashBoard.css';
import FastAPIClient from "../client";
import { Navigate } from "react-router-dom";

const client=new FastAPIClient();


class DashBoard extends React.Component{
    constructor(props){
            super(props)
            this.state={
                isLoggedIn:false
            }

    }
    componentDidMount(){
        console.log('componentDidMount DashBoard');
        const tokenString=localStorage.getItem("token");
        if (tokenString){
            console.log("TOKEN FOUND VALID");
            const token=JSON.parse(tokenString);
            console.log(JSON.stringify(token));
            const isValid=JSON.stringify(token)!= JSON.stringify({error:"invalid credentials"});
            console.log("Is token valid ?",isValid);
            if (isValid){
                this.setState({ isLoggedIn: true }, () => {
                    console.log("state",this.state);
                });
            }
        }
        console.log(this.state);
    }




    render(){
        if (!this.state.isLoggedIn){
            return(<Login/>);
            // return <Navigate to="/login"/>
        }else{
        return(
            <div id="dashboard-container">
                <h2>DashBoard</h2>
                <DashBoardComponent/>
            </div>
        )
        }
    }
}

export default DashBoard;