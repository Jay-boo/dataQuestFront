
import React from "react";
import ReactMarkdown from "react-markdown";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WarningAmber from "@mui/icons-material/WarningAmber";

class Jump extends React.Component{

  render(){
    const length=parseInt(this.props.children);
    const heightPx = length * 10 + "px";
    console.log("Jump Component height :",heightPx);

    return(

                    <div style={{ display:'flex',width:"100%",justifyContent:"center",backgroundColor:"transparent",height:heightPx}}>
                    </div>
    )
  }
}

export default Jump;
