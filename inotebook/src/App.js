import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState';
import { useState } from 'react';
import Alert from './components/Alert';



function App() {
  const [mode,setMode]=useState('light')
  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark')
      document.body.style.backgroundColor="#57534e"
    }
    else{
      setMode('light');
      document.body.style.backgroundColor="#ECE2D0"
    }
  }
  
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar toggleMode={toggleMode} mode={mode}/>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/about' element={<About />}></Route>
            </Routes>

        </BrowserRouter>

    </NoteState>

    </>
  );
}

export default App;
