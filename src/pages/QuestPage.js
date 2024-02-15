import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import QuestionComponent from '../components/QuestionComponent';





const QuestPage = () => {
  const { id } = useParams();

  return (
    <div id="quest-container">
      <h1>Quest </h1>
      <QuestionComponent value={id}/>
    
    </div>
  );
};

export default QuestPage;
