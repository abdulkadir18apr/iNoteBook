import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

export default function WelcomeUser(props) {
    const contextObj=useContext(noteContext);
    const {getUserData,user}=contextObj;
    getUserData();
  return (
    <div className='container'>
        <li style={{color:"#A21CAF",position:"absolute",left:"74%",bottom:"35%",fontWeight:"bold"}}>Welcome {user}</li>
      
    </div>
  )
}
