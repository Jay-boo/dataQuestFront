import React from "react";
import DashBoardComponent from "../components/DashBoardComponent"

class DashBoard extends React.Component{
    render(){
        return(
            <div>
                <span>DashBoard Page</span>
                <DashBoardComponent/>
            </div>
        )
    }
}

export default DashBoard;