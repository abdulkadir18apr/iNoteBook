import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

import  '../css/Addnote.css'

export default function Addnote(props) {
    const {addNote} =useContext(noteContext)
    const [note,setNote]=useState({title:'',description:'',tag:''})
    const HandleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:'',description:'',tag:''})
        props.showAlert("Note Added Successfully",'success');

    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
 
    <div className="form-container">
    <div className="form">
        <h1>Add a Note</h1>
        <div className="tag form-element">
            <label htmlFor="tag">Tag</label>
            <input type="text" name="tag" id="tag"  value={note.tag}  onChange={onChange} required minLength={5}/>
        </div>
        <div className="title form-element">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={note.title} onChange={onChange} required minLength={5}/>
        </div>
        <div className="description form-element">
            
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" cols="10" rows="5"  value={note.description} onChange={onChange} required minLength={5}></textarea>
        </div>
        <button  disabled={note.title.length<5 || note.description.length<5 ?true:false} type="submit" id="submit-btn" onClick={HandleClick}>Submit</button>
    </div>
</div>

  )
}
