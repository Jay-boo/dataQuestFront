import React from 'react';
import {useParams} from 'react-router-dom';
import QuestionComponent from '../components/QuestionComponent';

const QuestPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Quest Page</h1>
      <p>Quest ID: {id}</p>
      <QuestionComponent/>
    
    </div>
  );
};

export default QuestPage;
