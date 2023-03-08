import React, { useContext } from 'react'
import Notes from './Notes'
import '../css/Home.css'

import Addnote from './Addnote'
export default function Home(props) {

  return (
    <div className="main-container">
      <Addnote  showAlert={props.showAlert}/>
      <Notes showAlert={props.showAlert}/>
    </div>
    

  )
}
