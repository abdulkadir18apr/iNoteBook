import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import '../css/Noteitem.css'

export default function NoteItem(props) {
    const { note } = props
    const { deleteNode } = useContext(noteContext)
    return (
        <div className='card-caontainer'>
            <div className="horizontal">
                <div className="tag">{note.tag}</div>
                <div className="icon">
                    <i className="fa-regular fa-trash-can mx-2" onClick={() =>{deleteNode(note._id); props.showAlert('Deleted Successfully','success');}}></i>
                    <i className="fa-regular fa-pen-to-square mx-2"  onClick={(()=>props.updateNote(note))}></i>
                </div>
            </div>
            <div className="vertical">
                <div className="title">{note.title}</div>
                <div className="description">{note.description}</div>
            </div>
        </div>
    )
}