import React from "react";
import DashBoardComponent from "../components/DashBoardComponent"
import Login from '../pages/Login';
import '../styles/DashBoard.css';
import FastAPIClient from "../client";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import NotLoggedIn from "./NotLoggedIn";

const client=new FastAPIClient();


class DashBoard extends React.Component{
    constructor(props){
            super(props)
            this.state={
                isLoggedIn:false
            }

    }
    componentDidMount(){
        console.log('componentDidMount');
        const tokenString=localStorage.getItem("token");
        if (tokenString){
            console.log("TOKEN FOUND VALID");
            const token=JSON.parse(tokenString);
            console.log(JSON.stringify(token));
            const isValid=JSON.stringify(token)!= JSON.stringify({error:"invalid credentials"});
            console.log("Is token valid ?",isValid);
            if (isValid){
                this.setState({isLoggedIn:true})
            }
        }
        console.log('TOKEN NOT FOUND');
    }




    render(){
        if (this.state.isLoggedIn){
        return(
            <div id="dashboard-container">
                <h2>DashBoard</h2>
                <DashBoardComponent/>
            </div>
        )
        }
        else{
            return(<Login/>)
        }
    }
}

export default DashBoard;