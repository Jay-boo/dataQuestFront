import React from "react";
import '../styles/toggleList.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { blue } from "@mui/material/colors";



const copyToClipboard = (text) => {
                    console.log("COPY TO CLIPBOARD",text);
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
    console.log("Toggling");
    this.setState({toggle:!this.state.toggle})
  }





  render(){
    console.log("toggle Content",this.props.children);
    const components={
      code({node,inline,className,children,...props}){
        const language= className ? className.replace('language-',''):'plaintext';
        console.log('language',language);
        if (language=="plaintext"){
                      return(
                          <span style={{backgroundColor:"red",justifyContent:"center",paddingLeft:"5px",paddingRight:"5px",paddingTop:"2px",borderRadius:"5px",backgroundColor:"#2e344b",color:"#C38181"}}>{children}</span>
                      )
        }else if(language=="callout"){
          return(

                      <div style={{ backgroundColor:"#AA4A44", padding: "1em", margin: "0.5em 0px", overflow: "auto", borderRadius: "10px", width:"90%",fontWeight:"bolder" }}>
                        <div style={{ position: 'relative' }} dangerouslySetInnerHTML={{ __html: children }}>
                        </div>
                      </div>
                      )
        }else{
          return (
                      <div style={{ backgroundColor:"#060522", padding: "1em", margin: "0.5em 0px", overflow: "auto", borderRadius: "10px", width:"90%",fontSize:"14px" }}>
                        <div style={{ position: 'relative',display:'flex'  }}>
                          <IconButton aria-label="content-copy" style={{ position: 'absolute', top: '-4px', right: '5px', color:"white" }} onClick={() => { copyToClipboard(children) }}>
                            <ContentCopyIcon />
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
                    );


        }

      },
      p({node,children,...props}){
        return (
        <p style={{marginBottom:"1rem"}} {...props}> 
            {children}
        </p>
        )
      }


    }
    
    return(
    <div className={`toggleSection ${this.state.toggle ? 'toggled' : ''}`}>
      <div className="togglingBtn">
      {this.state.toggle ?  <RemoveCircleIcon onClick={()=>{this.handleToggle()}}/> : <AddCircleIcon onClick={()=>{this.handleToggle()}}/>}
        <span>Indice 💡</span>
      </div>
      <span className="togglingSpan">
          {this.state.toggle && <ReactMarkdown components={components} >{this.props.children}</ReactMarkdown>} 
      </span>
    </div>
    )
  }
}

export default ToggleList;
