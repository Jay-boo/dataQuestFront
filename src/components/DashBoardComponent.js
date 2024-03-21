
import {Link} from 'react-router-dom';
import React from "react";
import FastAPIClient from '../client';
import logo from '../resources/slime_logo.png'; // Import the image
import CompletionBar from './CompletionBar';
import CompletionBarQuest from './CompletionBarQuest';

const client=new FastAPIClient();

class Quest{
    constructor(id,description,step_number,length){
        this.id=id;
        this.description=description;
        this.step_number=step_number;
        this.length=length
    }
}

class DashBoardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            quests:[]
        }
    }



    componentDidMount(){
        console.log("Did mount");
        client.getQuest().then(
            data=> this.setState({
                quests:[new Quest(data.id,data.desc,data.step_number,data.length)]
            })
        );


    };
  handleClickDiv(href){
    window.location.href=href
  }

    render(){
        return(
                <div id="quests-container">
                    {
                        this.state.quests.map((quest)=>{
                            return(
                              <div class="quest">
                                        <img src={logo} className="slime-logo" alt="Quest icon"></img>
                                <div className="quest-info-container" onClick={(e)=>{this.handleClickDiv(`/quest/${quest.id}`)}} key={quest.id}>
                                    <h3>{quest.description}</h3>
                                    <p>Etape: {quest.step_number}</p>
                                    <CompletionBarQuest data={quest.step_number} max={quest.length}/>
                                </div>
                                
                              </div>
                            );

                        })
                    }
                </div>
        )
    }
}
export default DashBoardComponent;
