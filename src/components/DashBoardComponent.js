
import {Link} from 'react-router-dom';
import React from "react";


class Quest{
    constructor(id,name,description,step){
        this.id=id;
        this.name=name;
        this.description=description;
        this.step=step;
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
        console.log("get_quest");
        this.setState({quests:[
            new Quest(0,"name 1","Im on ",3),
            new Quest(1,"name 2","Im on again ",4)
        ]})

    };

    render(){
        return(
                <div id="quests-container">
                    {
                        this.state.quests.map((quest)=>{
                            return(
                                    <div class="quest">
                                <Link to={`/quest/${quest.id}`} key={quest.id}>
                <h3>{quest.name}</h3>
                <p>{quest.description}</p>
                <p>Step: {quest.step}</p>
            </Link>
                </div>
                            );

                        })
                    }

                </div>
        )
    }
}
export default DashBoardComponent;