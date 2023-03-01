import  {useState} from "react";
import noteContext from "./NoteContext";
const NoteState=(props)=>{

    const notesInitial={
        "notes": [
            {
              "_id": "63fc8a8a286fb94c79a9c6fe",
              "user": "63fc3f12904866357e62fb89",
              "title": "Wake Up",
              "description": "9:30 sharp morning",
              "tag": "Alarm",
              "date": "2023-02-27T10:48:42.341Z",
              "__v": 0
            },
            {
              "_id": "63ff53a9af0f29f90728912f",
              "user": "63fc3f12904866357e62fb89",
              "title": "React Playlist",
              "description": "Lecture01 all notes",
              "tag": "study",
              "date": "2023-03-01T13:31:21.864Z",
              "__v": 0
            },
            {
              "_id": "63ff53b1af0f29f907289131",
              "user": "63fc3f12904866357e62fb89",
              "title": "React Playlist",
              "description": "Lecture02 all notes",
              "tag": "study",
              "date": "2023-03-01T13:31:29.816Z",
              "__v": 0
            }
          ]
    }

    const [notes,setNotes]=useState(notesInitial)
    return (
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState