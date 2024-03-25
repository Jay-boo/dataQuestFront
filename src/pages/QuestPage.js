import React, { useEffect, useState } from 'react';
import FastAPIClient from '../client';
import {useParams} from 'react-router-dom';
import QuestionComponent from '../components/QuestionComponent';




const client=new FastAPIClient();

const QuestPage = () => {
  const { id } = useParams();
  const [questDesc,setQuestDesc]=useState(null);

  useEffect(()=>{
    console.log("Component Mounted in QuestPage");
    client.getQuestById(id).then(
      data=>{setQuestDesc(data.desc);
        console.log("dataQuest",data.desc);
      }
    ).catch(err=>{console.error('Error fetching quest data: ',err )})
  })

  return (
    <div id="quest-container">
      <h1>Quest: {questDesc} </h1>
      <QuestionComponent value={id}/>
    
    </div>
  );
};

export default QuestPage;
