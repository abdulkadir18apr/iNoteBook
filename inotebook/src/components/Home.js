import React, { useContext } from 'react'
import Notes from './Notes'
import '../css/Home.css'
import noteContext from '../context/notes/NoteContext'
import Addnote from './Addnote'
import Alert from './Alert'
export default function Home(props) {
  console.log(props)

  return (
    <div className="main-container" style={{backgroundColor:"#bae6fd",display:'flex',alignContent:"flex-start",paddingLeft:"2rem",height:"100%"}}>
      <div className="addnote-container" style={{width:"40%" ,paddingLeft:"3rem"}}>
        <Addnote  showAlert={props.showAlert}/>
      </div>
      <div className="notes-container" style={{width:"60%"}}>
        <Notes showAlert={props.showAlert}/>
      </div>
  
    </div>
    

  )
}
