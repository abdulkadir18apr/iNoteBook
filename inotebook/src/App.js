import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState';
import { useState } from 'react';



function App() {
  const [mode,setMode]=useState('light')
  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark')
      document.body.style.backgroundColor="#57534e"
    }
    else{
      setMode('light');
      document.body.style.backgroundColor="#fff7ed"
    }
  }
  console.log("Hello")
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar toggleMode={toggleMode} mode={mode}/>
          <div className="container">
           
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/about' element={<About />}></Route>
            </Routes>
          </div>

        </BrowserRouter>

    </NoteState>
        

    


    </>
  );
}

export default App;
