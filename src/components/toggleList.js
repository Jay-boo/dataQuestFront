import React from "react";
import '../styles/toggleList.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


class codeRender extends React.Component{
render(){
  return(
    <div style={{backgroundColor:"red"}}>PROUT</div>
  )
}
}

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

  parseHTML(html){
    const regex = /<codeRender.*?>([\s\S]*?)<\/codeRender>/g;
    const parsedHTML = html.replace(regex, (match, content) => {
      console.log('FOUND');

      return(`
        <div >PROUT</div>`
      )
    });
    return parsedHTML;

  }



  render(){
    console.log("UNPARSED",this.props.children);
    const parsed_HTML=this.parseHTML(this.props.children);
    console.log('PARSED',parsed_HTML);
    
    return(
    <div className={`toggleSection ${this.state.toggle ? 'toggled' : ''}`}>
      <div className="togglingBtn">
      {this.state.toggle ?  <RemoveCircleIcon onClick={()=>{this.handleToggle()}}/> : <AddCircleIcon onClick={()=>{this.handleToggle()}}/>}
        <span>Indice 💡</span>
      </div>
      <span className="togglingSpan">
      

        
      {this.state.toggle && (
            <div style={{ position: 'relative',marginTop:"10px" }} dangerouslySetInnerHTML={{ __html: parsed_HTML}}>
                        </div>)}
      {this.state.toggle && (
            <div style={{ position: 'relative',marginTop:"10px" }} dangerouslySetInnerHTML={{ __html: this.props.children }}>
                        </div>)}
      </span>
    </div>
    )
  }
}

export default ToggleList;
