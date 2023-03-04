import  {useState} from "react";
import Alert from "../../components/Alert";
import noteContext from "./NoteContext";

   
const NoteState=(props)=>{
    const host="http://localhost:8000/"
    const notesInitial=[];
    const [notes,setNotes]=useState(notesInitial)

    
    const getNotes=async()=>{
      const response = await fetch(`${host}api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYzNmMTI5MDQ4NjYzNTdlNjJmYjg5In0sImlhdCI6MTY3NzQ3ODA2NX0.KF6mkj9HUpKf3t9sPQA0TIJm6rHPidcUrXaV7wHDF-A" 
        },
      });
      const json=await response.json()
     setNotes(json.notes)
  
      //Api Call

    }

    // ADD A NOte
    const addNote=async(title,description,tag)=>{
      //api Call
      const response = await fetch(`${host}api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYzNmMTI5MDQ4NjYzNTdlNjJmYjg5In0sImlhdCI6MTY3NzQ3ODA2NX0.KF6mkj9HUpKf3t9sPQA0TIJm6rHPidcUrXaV7wHDF-A" 
        },
        body: JSON.stringify({title,description,tag}), 
      });
      const json=await response.json().then((data)=>data)

      const note= {     
        "_id": json._id,
        "user": json.user,
        "title":json.title,
        "description":json.description,
        "tag":json.tag,
        "date":json.date,
        "__v": 0
      }
      setNotes(notes.concat(note));
      console.log("Adding a Note")

    }


    //Delete a Notes
    const deleteNode=async(id)=>{
      console.log("deleting the note");
      console.log(id);
      const newnotes=notes.filter((note)=>note._id!==id);
      setNotes(newnotes)
      //Api CALL
      const response = await fetch(`${host}api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYzNmMTI5MDQ4NjYzNTdlNjJmYjg5In0sImlhdCI6MTY3NzQ3ODA2NX0.KF6mkj9HUpKf3t9sPQA0TIJm6rHPidcUrXaV7wHDF-A" 
        },
      });
      setTimeout(()=>{
        <Alert message="Note Deleted"/>
      },2000)
     
    }


    ///Edit a Note
    const editNote=async(id,title,description,tag)=>{
      //Api Call
      const response = await fetch(`${host}api/notes/updatenote:${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYzNmMTI5MDQ4NjYzNTdlNjJmYjg5In0sImlhdCI6MTY3NzQ3ODA2NX0.KF6mkj9HUpKf3t9sPQA0TIJm6rHPidcUrXaV7wHDF-A" 
        },
        body: JSON.stringify({title,description,tag}), 
      })
      const json=response.json()
      //Logic to Edit in Client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===id){
          element.title=title
          element.description=description
          element.tag=tag
        }
      }

    }

    return (
        <noteContext.Provider value={{notes,setNotes,addNote,deleteNode,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState