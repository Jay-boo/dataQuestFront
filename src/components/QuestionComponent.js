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
import ToggleList from './markdownRendering/toggleList';
import MarkdownRenderer from './markdownRendering/MarkdownRenderer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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
  fontFamily: ["Montserrat", "sans-serif"
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
      questStepNumber:null,
      currentQuestionStepNumber:null,
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
            questStepNumber:data.step_number,
            currentQuestionStepNumber:data.step_number,
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
            isDataLoaded:true,
            questStepNumber:data.step_number,
            currentQuestionStepNumber:data.step_number
          });
          window.scrollTo({
            top:0,
            behavior:"smooth"
          })
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
        console.log('Is Data',data,isVerify);
        this.setState({showValidationDetails:data.some(el=>el.exist) })
        
      }
    )

          // Put what append if its verified
          if (this.state.question[0].step==13){
            window.alert("Fin de la certification 🎉🎉🎉🎉🎉")

          }
          }
        }
      )
    
  }
  


  getOtherQuestion(goPrevious){
    console.log('getPrevious state:',this.state);
    client.getQuestOtherQuestion(this.props.value,goPrevious ?(this.state.currentQuestionStepNumber-1):(this.state.currentQuestionStepNumber+1)).then(

      ({data,error})=>{
        if (error==null){

          this.setState({question:[new Question(data.text,data.step_number,data.verify)],
          currentQuestionStepNumber:data.step_number
          });
        }else if (error==401){

          this.setState({
            isLoggedIn:false,
            isDataLoaded:true
          });

        }
        console.log("In getPreviousQuestion",data,error);
    }
    )
    .catch(err=>{
      console.log("Error in getPreviousQuestion",err);
    })
  }

  // getNext(){

  // }

  render(){
    console.log('render',this.state);
  

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
              
                  <MarkdownRenderer content={question.text}/>

              
              
              {this.state.currentQuestionStepNumber==this.state.questStepNumber &&(<div className="validation-container">
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
                            </span> {element.exist ? "déployée":"introuvable"} </p>
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
                </div>)}
              </div>
              

            <div class="navigation-container">
            {this.state.currentQuestionStepNumber>0  && (
              
              <ValidateButton variant="contained" startIcon={<ArrowBackIcon/>}onClick={(e)=> this.getOtherQuestion(true)} >
                 Précedent (Q.{this.state.currentQuestionStepNumber} )
              </ValidateButton> )
            }
            {this.state.currentQuestionStepNumber<this.state.questStepNumber &&(
              <ValidateButton variant="contained" endIcon={<ArrowForwardIcon/>} onClick={(e)=> this.getOtherQuestion(false)} > Suivant (Q.{this.state.currentQuestionStepNumber+2})
              </ValidateButton>  
            )}
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
