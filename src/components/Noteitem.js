import React, { useState, useContext } from 'react';
import noteContext from '../context/noteContext';

const Noteitem = (props) => {
    let context = useContext(noteContext);
    let { deleteNote } = context; 
    const { note, updateNote } = props

    return (
        <>
            <div className="col-md-3">
                <h2>this NoteItem</h2>
                <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title">   {note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <button type="button" className="btn btn-info mx-2" onClick={()=>{updateNote(note)}} >Edit</button>
                        <button type="button" className="btn btn-danger mx-2" onClick={()=>{deleteNote(note._id)}}>Delete</button>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Noteitem
