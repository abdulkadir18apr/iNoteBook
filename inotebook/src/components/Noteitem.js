import React from 'react'

export default function Noteitem(props) {
    const {note}=props
  return (
    <div>
        {note.title}
        {note.description}
    </div>
  )
}
