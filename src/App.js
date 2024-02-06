import './styles/App.css';
import React, { useRef } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import QuestPage from './pages/QuestPage';
import SignUp from './pages/SignUp';

function App() {
  const sidenavRef=useRef(null);
  const openNav = () => {
    sidenavRef.current.classList.add("active");
  };
  const closeNav = () => {
    sidenavRef.current.classList.remove("active");
  };
  return (
    <div className="App">
      <header>
      <div ref={sidenavRef} id="mySidenav" class="sidenav">
  <a id="closeBtn" href="#" class="close"onClick={closeNav}>&times;</a>
  <ul>
    <li><a href="#">Login</a></li>
    <li><a href="#">Dashboard</a></li>
  </ul>
</div>

<a href="#" id="openBtn" onClick={openNav}>
  <span class="burger-icon">
    <span></span>
    <span></span>
    <span></span>
  </span>
</a>

        <span style={{marginLeft:'15px'}}>Menu</span>
      </header>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/quest/:id" element={<QuestPage/>} />
      </Routes>
      
      </BrowserRouter>


    </div>
  );
}


export default App;
