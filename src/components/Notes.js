import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
    let context = useContext(noteContext);
    let { notes, getAllNotes, editNote } = context;
    let [note, setNote] = useState({id:"", etitle:"",edescription:"",tag:"default"});
    let ref = useRef(null);
    let refClose = useRef(null);

    useEffect(() => {
        // if(localStorage.getItem('token')){
            getAllNotes()
        // }
    }, [])


    let updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description})
    }
    

    let onHandle = (e) => {
        console.log("updating")
        editNote(note.id, note.etitle, note.edescription)
         refClose.current.click();
    }

  
    let onchangeClick = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <Addnote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-etitle fs-5" id="exampleModalLabel">Update Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchangeClick} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onchangeClick} />
                                </div>
                   
                             
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={onHandle} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h1>This is Notes Avaiable</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
