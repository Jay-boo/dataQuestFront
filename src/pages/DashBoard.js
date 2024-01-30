import React from "react";
import DashBoardComponent from "../components/DashBoardComponent"
import '../styles/DashBoard.css';

class DashBoard extends React.Component{
    render(){
        return(
            <div id="dashboard-container">
                <h2>DashBoard</h2>
                <DashBoardComponent/>
            </div>
        )
    }
}

export default DashBoard;