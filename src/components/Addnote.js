import React, { useState, useContext } from 'react';
import noteContext from '../context/noteContext';

const Addnote = () => {
    let context = useContext(noteContext);
    let { addNote } = context; 
    let [note, setNote] = useState({title:"",description:"",tag:"default"});

    let onHandle = (e) => {
        e.preventDefault()
           addNote(note.title, note.description, note.tag)
           setNote({title:"",description:""})
    }

  
    let onchangeClick = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
   <>
   <div className="container">
        <h1>This Your Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onchangeClick} />

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onchangeClick} />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onchangeClick} />
          </div> */}
          <button type="submit" className="btn btn-primary" onClick={onHandle} >Add Note</button>
        </form>
      </div>
   </>
  )
}

export default Addnote
