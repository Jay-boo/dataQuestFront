import React from "react";
import '../styles/QuestionComponent.css'

class Question{
  constructor(id,number,text,is_validated){
    this.id=id;
    this.number=number;
    this.text=text;
    this.is_validated=is_validated;
  }
}




class QuestionComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={questions:[new Question(1,1,"creer le bucket freddy_bucket",false),
  new Question(2,2,"Creer la table externe ",false)
  ]}
  
  }

  render(){
    return(
      <div id="question-container">
        {this.state.questions.map((question)=>{

          return(
            <div id={question.id} class="question">
              
              <h2> Question  n° {question.number}</h2>
              <span> 
                  {question.text}
              </span>
              <br></br>
              <span>
                {question.is_validated ? "validated": "not validated"}
              </span>
            </div>
          )

        })}

      </div>

    )
  }
}

export default QuestionComponent;
