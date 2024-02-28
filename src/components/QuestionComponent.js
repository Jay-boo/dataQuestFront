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
import { Button  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ToggleList from './toggleList';
import MarkdownRenderer from './MarkdownRenderer';


const client=new FastAPIClient();
class Question{
  constructor(text,step,verify){
    this.text=text;
    this.step=step;
    this.verify=verify;
  }
}

const ValidateButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#060522',
  borderColor: '#060522',
  fontFamily: ['JetBrains Mono','ui-monospace','SFMono-Regular','Menlo','Monaco','Consolas','Liberation Mono','Courier New','monospace'
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});





















class QuestionComponent extends React.Component{

  constructor(props){
    super(props);
    this.state={
      question:[],
      isLoggedIn:false,
      isDataLoaded:false,
      isValidated:null,
      showValidationDetails:false
    }
  
  }
  componentDidMount(){
    console.log("ComponentDidMount QuestionComponent");
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
        console.log("In getQuestQuestion",data,error);
    }
    )
    .catch(err=>{
      console.log("Error in componentDidMount",err);
    })
    client.getValidateInfo().then(

      ({data,error})=>{
        console.log("getValidateInfo()",data,error)
        if(error==null){
          this.setState({
            isValidated:data
          })
          console.log("data validate",data,error);
          const isVerify=data.some(obj => obj.exist);
          console.log('Is DaTa',data,isVerify);
          this.setState({showValidationDetails:data.some(el=>el.exist) })
        }else if(error==401){
          this.setState({
            isLoggedIn:false,
            isDataLoaded:true
          });
        }
        
        
      }
    )

  }

  handleOnValidate=(e)=>{
      console.log("On validate btn click");

      client.validate().then(
        ({data,error})=>{
          if(error==null){
            this.setState({
              isValidated:data,
              showValidationDetails:true,

            })
          }else if(error==401){
            this.setState({
              isLoggedIn:false,
              isDataLoaded:true
            });
          }
          console.log("data handleOnValidate=> ",data);
          const isVerify=data.every(obj => obj.exist);
          console.log('pass next Question',isVerify);
          if (isVerify){

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
    }
    )
    .catch(err=>{
      console.log("Error in componentDidMount",err);
    })
    client.getValidateInfo().then(

      ({data,error})=>{
        if(error==null){
          this.setState({
            isValidated:data,
            showValidationDetails:false
          })
        }else if(error==401){
          this.setState({
            isLoggedIn:false,
            isDataLoaded:true
          });
        }
        
        console.log("data validate",data,error);
        const isVerify=data.some(obj => obj.exist);
        console.log('Is DATa',data,isVerify);
        this.setState({showValidationDetails:data.some(el=>el.exist) })
        
      }
    )

          }
        }
      )
    
  }

  render(){
    console.log('render',this.state);
  
    const markdownString=`
Some markdown with a 

# Title

## Subtitle

Here is some text
<!-- hint --> Hidden text .... Everyhtink is secret <!-- /hint -->

print("hrllo")

`;
   
    const components = {
      myTag: ({ children }) => <span style={{ color: 'red' }}>PROUT</span>,
    };


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
                  <MarkdownRenderer content={question.text}/>

              
              
              <div className="validation-container">
                { this.state.showValidationDetails && (
                <div className="completionState">
                  <CompletionBar data={this.state.isValidated}/>
                  <div className="validationSubElement-container">
                  {
                    this.state.isValidated.map( 
                      (element)=>{
                        return(
                          <div className="validationSubElement" style={{backgroundColor:element.exist ? "green":"red"}}>
                            <p> 
                              
                            {element.exist && <CheckCircleIcon/>}
                            {!element.exist && <CancelIcon/>}
                              {element.exist ? "Ok": "Problème"} {element.type} :  <span style={{backgroundColor:"red",justifyContent:"center",paddingLeft:"5px",paddingRight:"5px",paddingTop:"2px",borderRadius:"5px",backgroundColor:"#2e344b",color:"#C38181"}}>
                              {element.name}
                            </span> introuvable </p>
                          </div>
                        )
                      }
                    )
                  }
                  </div>
                </div>)}
                <ValidateButton variant="contained" endIcon={<SendIcon />}  onClick={(e)=> this.handleOnValidate(e)}>
                        Validate
                </ValidateButton>
                </div>
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
