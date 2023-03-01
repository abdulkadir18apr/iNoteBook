import React, { useContext } from 'react'

import noteContext from '../context/notes/NoteContext'
export default function Home() {

  return (
    <div className="container">
      <h1 className="my-3">Add a Mode</h1>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <h2>Your Notes</h2>
    </div>
    

  )
}
