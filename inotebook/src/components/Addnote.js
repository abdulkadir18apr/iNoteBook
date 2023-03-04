import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

import  '../css/Addnote.css'

export default function Addnote() {
    const {addNote} =useContext(noteContext)
    const [note,setNote]=useState({title:'',description:'',tag:''})
    const HandleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)

    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
 
    <div className="form-container">
    <div className="form">
        <h1>Add a Note</h1>
        <div className="tag form-element">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag"  onChange={onChange}/>
        </div>
        <div className="title form-element">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" onChange={onChange}/>
        </div>
        <div className="description form-element">
            
            <label for="description">Description</label>
            <textarea name="description" id="description" cols="10" rows="5" onChange={onChange}></textarea>
        </div>
        <button type="submit" id="submit-btn" onClick={HandleClick}>Submit</button>
    </div>
</div>

  )
}
