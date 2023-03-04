
import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import '../css/Notes.css'


export default function Notes() {
  let noteObj = useContext(noteContext);
  let { notes, getNotes } = noteObj;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])
  const updateNode = (note) => {

  }
  return (
    <div className="note-container" >
      {notes.map((note) => <Noteitem note={note} key={note._id} updateNode={updateNode} />)}

    </div>

  )
}
