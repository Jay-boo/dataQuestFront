import React from "react";


class Question{
  constructor(id,text,is_validated){
    this.id=id;
    this.text=text;
    this.is_validated=is_validated;
  }
}




class QuestionComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={question:new Question(1,"creer le bucket freddy_bucket",false)}
  }

  render(){
    return(
    <div>
      
      <h2> Question : {this.state.question.id}</h2>
      <span> 
          {this.state.question.text}
      </span>
      <br></br>
      <span>
        {this.state.question.is_validated ? "validated": "not validated"}
      </span>

        
    </div>

    )
  }
}

export default QuestionComponent;
