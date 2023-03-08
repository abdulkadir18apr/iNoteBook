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
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [color,setColor]=useState('#bae6fd');
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      setColor("#3f3f46")
    }
    else {
      setMode('light');
      setColor("#bae6fd");
    }
  }

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type })
    setTimeout(() => {
      setAlert(null);

    }, 2000)


  }

  return (
    <div className='page' style={{backgroundColor:color,height:"100vh"}}>
      <NoteState>
        <BrowserRouter>

          <Navbar toggleMode={toggleMode} mode={mode} />
          <Alert alert={alert} />
          <div className="app-container" style={{display:"flex",justifyContent:"center"}}>
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/login' element={<Login showAlert={showAlert} mode={mode} />}></Route>
              <Route path='/signup' element={<Signup showAlert={showAlert} mode={mode} />}></Route>
            </Routes>

          </div>


        </BrowserRouter>

      </NoteState>

    </div>
  );
}

export default App;
