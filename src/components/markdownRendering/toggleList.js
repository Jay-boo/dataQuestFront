import React from "react";
import '../../styles/markdownComponents/toggleList.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { blue } from "@mui/material/colors";



const copyToClipboard = (text) => {
                    // console.log("COPY TO CLIPBOARD",text);
                    navigator.clipboard.writeText(text)
                      .catch((error) => console.error('Could not copy code: ', error));
                  };

class ToggleList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      toggle:false
    }
  }

  handleToggle(){
    // console.log("Toggling");
    this.setState({toggle:!this.state.toggle})
  }





  render(){
    // console.log("toggle Content",this.props.children);

  const subcomponents={
      code({node,inline,className,children,...props}){
        const language= className ? className.replace('language-',''):'plaintext';
        // console.log('language',language);
        if (language=="plaintext"){
                      return(
                          <span style={{backgroundColor:"red",justifyContent:"center",paddingLeft:"5px",paddingRight:"5px",paddingTop:"2px",borderRadius:"5px",backgroundColor:"#2e344b",color:"#C38181"}}>{children}</span>
                      )
        }

      },

  }

  const components={
    code({node,inline,className,children,...props}){
      const language= className ? className.replace('language-',''):'plaintext';
      // console.log('language',language);
      if (language=="plaintext"){
                    return(
                        <span style={{backgroundColor:"rgba(0,0,0,0.08)",justifyContent:"center",paddingLeft:"5px",paddingRight:"5px",paddingTop:"2px",borderRadius:"5px",color:"#C38181",fontFamily: "Reddit Mono" }}>{children}</span>
                    )
      }else if(language=="callout"){
        return(

                    <div style={{ display:'flex',width:"100%",justifyContent:"center"}}>
                      <div style={{ backgroundColor:"#C38181", padding: "0.5em", overflow: "auto", borderRadius: "10px", width:"90%",fontWeight:"bolder", fontSize:"16px" }}>
            <ReactMarkdown components={subcomponents}>{children}</ReactMarkdown>
                        
                      </div>
                    </div>
                    )
      }else{
        return (
                    <div style={{ display:'flex',width:"100%",justifyContent:"center"}}>
                    <div style={{ backgroundColor:"rgba(0,0,0,0.78)", padding: "1em", margin: "0.5em 0px", overflow: "auto", borderRadius: "10px", width:"90%",fontSize:"14px" }}>
                      <div style={{ position: 'relative',display:'flex'  }}>
                        <IconButton aria-label="content-copy" style={{ position: 'absolute', top: '-4px', right: '5px', color:"white",fontSize:"13px" }} onClick={() => { copyToClipboard(children) }}>
                          <ContentCopyIcon /> Copy code
                        </IconButton>
                        <SyntaxHighlighter
                          language={className.replace('language-', '')} // Extract language from className
                          style={darcula}
                          PreTag={(props) => (
                            <pre id={`code-${Math.random().toString(36).substr(2, 9)}`} {...props} style={{ borderRadius: "10px", marginTop:"0%" }} />
                          )}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                    </div>
                  );


      }
    },
    p({node,children,...props}){
      return (
      <p style={{marginBottom:"1rem"}} {...props}> 
          {children}
      </p>
      )
    },
    // a({node,children,...props}){
      // console.log("---------------------------GETTING a LINK")
    // },
    // h1({node,children,...props}){}
    // hr: () => <p style={{ marginBottom: "1rem" }}>Hello World</p>


  }
    
    return(

    <div className={`toggleSection ${this.state.toggle ? 'toggled' : ''}`}>
      <div className="togglingBtn">
      {this.state.toggle ?  <RemoveCircleIcon onClick={()=>{this.handleToggle()}}/> : <AddCircleIcon onClick={()=>{this.handleToggle()}}/>}
        <span>Astuce 💡</span>
      </div>
      <span className="togglingSpan">
          {this.state.toggle && <ReactMarkdown components={components} >{this.props.children}</ReactMarkdown>} 
      </span>
    </div>
    )
  }
}

export default ToggleList;
