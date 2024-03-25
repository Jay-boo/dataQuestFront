import React from "react";
import ReactMarkdown from "react-markdown";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WarningAmber from "@mui/icons-material/WarningAmber";

class Callout extends React.Component{

  render(){
  const subcomponents={
      code({node,inline,className,children,...props}){
        const language= className ? className.replace('language-',''):'plaintext';
        console.log('language',language);
        if (language=="plaintext"){
                      return(
                          <span style={{backgroundColor:"red",justifyContent:"center",paddingLeft:"5px",paddingRight:"5px",paddingTop:"2px",borderRadius:"5px",backgroundColor:"#2e344b",color:"#C38181"}}>{children}</span>
                      )
        }

      },

  }

          return(

                      <div style={{ display:'flex',width:"100%",justifyContent:"center"}}>
                        <div style={{ backgroundColor:"#C38181", padding: "0.5em", overflow: "auto", borderRadius: "10px", width:"90%",fontWeight:"bolder", fontSize:"13px",display:"flex",alignItems:'center' }}>
          <WarningAmber style={{margin:"1%"}}/>
              <ReactMarkdown components={subcomponents} >{this.props.children}</ReactMarkdown>
                          
                        </div>
                      </div>
                      )
  }
}

export default Callout;
