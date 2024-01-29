import './App.css';
import React from 'react';
import {BrowserRouter,Route,Routes,useParams} from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import QuestPage from './pages/QuestPage';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/quest/:id" element={<QuestPage/>} />
      </Routes>
      
      </BrowserRouter>


    </div>
  );
}

export default App;
