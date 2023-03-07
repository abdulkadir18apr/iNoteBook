
import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import '../css/Notes.css'
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  let noteObj = useContext(noteContext);
  let { notes, getNotes,editNote} = noteObj;
  const ref = useRef(null);
  const navigate=useNavigate();
  const [note,setNote]=useState({tag:"",title:"",description:""});
  const updateNote = (note) => {
    ref.current.click();
    setNote(note);
  };
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
    console.log(note)
  }
  const HandleClick=()=>{
    editNote(note);
    props.showAlert('Updated Successfully','success');
    ref.current.click()
   

  }

 
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log("token mill gya")
      getNotes();
    }
    else{
      navigate('/login');
    }
   
    
    // eslint-disable-next-line
  }, [])

  return (
    <div className="note-container" >
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{ display: "none" }}>
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"> Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            
              <div className="tag form-element">
                <label htmlFor="tag">Tag</label>
                <input type="text" name="tag" id="tag"  onChange={onChange}  value={note.tag}/>
              </div>
              <div className="title form-element">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title"  onChange={onChange} value={note.title}/>
              </div>
              <div className="description form-element">

                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols="10" rows="5" onChange={onChange} value={note.description} textarea/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" disabled={note.title.length<5 || note.description.length<5 ?true:false}  onClick={HandleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      {notes.length===0 && <h1 className='container'>No Notes to Display</h1>}
      {notes.map((note) => <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert} />)}
    </div>

  )
}
