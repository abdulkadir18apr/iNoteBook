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
          "auth-token":localStorage.getItem('token')
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
          "auth-token":localStorage.getItem('token')
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
          "auth-token":localStorage.getItem('token')
        },
      });
      setTimeout(()=>{
        <Alert message="Note Deleted"/>
      },2000)
     
    }


    //Edit a Note
    const editNote=async(note)=>{
      const {_id,title,tag,description}=note;
      //Api Call
      const response = await fetch(`${host}api/notes/updatenote/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), 
      })
      const json=  await response.json()
      const newNotes=JSON.parse(JSON.stringify(notes))
     //Logic to Edit in Client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===_id){
          element.title=title
          element.description=description
          element.tag=tag
        }
      }
      setNotes(newNotes);

    }

    return (
        <noteContext.Provider value={{notes,setNotes,addNote,deleteNode,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState