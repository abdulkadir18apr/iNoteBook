import React,{useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';
export default function Notes() {
    const context=useContext(noteContext);
    const {notes,setNotes}=context;
  return (
    <div className="container my-3">
        <h2>Your NOTES</h2>
        {notes.notes.map((note)=>{
             <Noteitem note={note}/>
        })}

    </div>

  )
}
