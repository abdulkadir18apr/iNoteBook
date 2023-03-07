import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState';
import { useState } from 'react';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { type } from '@testing-library/user-event/dist/type';




function App() {
  const [mode,setMode]=useState('light');
  const [alert,setAlert]=useState(null);
  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark');
    }
    else{
      setMode('light');
    }
  }
  const showAlert=(message,type)=>{
    setAlert({msg:message,type:type})
    setTimeout(()=>{
      setAlert(null);
      
    },2000)
   

  }
  
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar toggleMode={toggleMode} mode={mode}/>
    <Alert alert={alert}/>
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/login' element={<Login showAlert={showAlert} />}></Route>
              <Route path='/signup' element={<Signup showAlert={showAlert} />}></Route>
            </Routes>

        </BrowserRouter>

    </NoteState>

    </>
  );
}

export default App;
