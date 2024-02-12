import React from "react";
import '../styles/QuestionComponent.css'
import FastAPIClient from '../client';
import NotLoggedIn from "../pages/NotLoggedIn";
import { Navigate } from 'react-router-dom';
import CompletionBar from "./CompletionBar";
import ReactMarkdown from "react-markdown"; 
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

class Question{
  constructor(text,step,verify){
    this.text=text;
    this.step=step;
    this.verify=verify;
  }
}

const client=new FastAPIClient();


class QuestionComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={question:[],isLoggedIn:false,isDataLoaded:false}
  
  }
  componentDidMount(){
    client.getQuestQuestion(this.props.value).then(

      ({data,error})=>{
        if (error==null){

          this.setState({question:[new Question(data.text,data.step_number,data.verify)],
            isLoggedIn:true,
            isDataLoaded:true
          });
        }else if (error==401){

          this.setState({
            isLoggedIn:false,
            isDataLoaded:true
          });
        }
        console.log("data compnenet DID mount",data,error);
    }
    )
    .catch(err=>{
      console.log("Error in componentDidMount",err);
    })
  }

  render(){
    console.log('render',this.state)
    const data_to_pass=[
      {
        "type": "bucket",
        "name": "archive_test",
        "exist": false
      },{
        "type": "cloudrun",
        "name": "cloudrun_test",
        "exist": true
      },{
        "type": "bucket",
        "name": "archive_test_bis",
        "exist": true
      }
    ]
    if (!this.state.isDataLoaded){
      return <div>LOADING ..</div>
    }

    if (this.state.isLoggedIn){
    return(
      <div id="question-container">
        {this.state.question.map((question)=>{

          return(
            <div id={question.id} class="question">
              <div className="question-content">
              
              <h2> Question  n° {question.step+1}</h2>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const copyToClipboard = (text) => {
                      console.log("COPY TO CLIPBOARD",text);
                      navigator.clipboard.writeText(text)
                        .catch((error) => console.error('Could not copy code: ', error));
                    };
              
                    return (
                      <div style={{ backgroundColor:"#060522", padding: "1em", margin: "0.5em 0px", overflow: "auto", borderRadius: "10px", width:"90%" }}>
                        <div style={{ position: 'relative' }}>
                          <IconButton aria-label="content-copy" style={{ position: 'absolute', top: '-4px', right: '5px', color:"white" }} onClick={() => { copyToClipboard(children) }}>
                            <ContentCopyIcon />
                          </IconButton>
                          <SyntaxHighlighter
                            language={className.replace('language-', '')} // Extract language from className
                            style={darcula}
                            PreTag={(props) => (
                              <pre id={`code-${Math.random().toString(36).substr(2, 9)}`} {...props} style={{ borderRadius: "10px" }} />
                            )}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    );
                  },
                  p({ node, children, ...props }) {
                    return (
                      <p style={{ marginBottom: "1rem" }} {...props}>
                        {children}
                      </p>
                    );
                  },
                }}
              >
                {question.text}
              </ReactMarkdown>
              <br></br>
              <span>
                {question.is_validated ? "validated": "not validated"}
              </span>
              <CompletionBar data={data_to_pass}/>
              </div>
              
            </div>
          )

        })}

      </div>


    )
      }
      else{
        return(<Navigate to="/unauthenticated_error" replace={false}></Navigate>)
      }
  }
}

export default QuestionComponent;
