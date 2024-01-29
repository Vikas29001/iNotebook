import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {

    let samplenNote = []

    let [notes, setNotes] = useState(samplenNote);


    let getAllNotes = async () => {
        let url = 'http://localhost:5000/api/notes/fetchAllnotes';
        let response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYmFhOTI2ZWJkOThhZWNmZTU4MWU4In0sImlhdCI6MTcwNTc1MDg2MH0.WYApS1W51NQoEYridQDeoqmegB2xXw_tLTTN_HxxKpg" },
        })
        let data = await response.json();
        console.log(data);
        setNotes(data)
    }



    let addNote = async (title, description, tag) => {


        let url = 'http://localhost:5000/api/notes/addUserNotes';
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYmFhOTI2ZWJkOThhZWNmZTU4MWU4In0sImlhdCI6MTcwNTc1MDg2MH0.WYApS1W51NQoEYridQDeoqmegB2xXw_tLTTN_HxxKpg" },
            body: JSON.stringify({title,description,tag})
        })
        let data = await response.json();
        console.log(data);
        // setNotes(data)

        // setNotes(concat(data));

    }

    let deleteNote = async (_id) => {
        let url = `http://localhost:5000/api/notes/deleteNote/${_id}`;
        let response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYmFhOTI2ZWJkOThhZWNmZTU4MWU4In0sImlhdCI6MTcwNTc1MDg2MH0.WYApS1W51NQoEYridQDeoqmegB2xXw_tLTTN_HxxKpg' }
        })


        let data = await response.json();
        console.log(data);
        setNotes(data)

        console.log("this has been deleted" + _id);
        let newNote = notes.filter((note) => { return note._id !== _id })
        setNotes(newNote);

    }

    let editNote = async (id, title, description) => {
        let url = `http://localhost:5000/api/notes/UpdateNote/${id}`;
        let response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhYmFhOTI2ZWJkOThhZWNmZTU4MWU4In0sImlhdCI6MTcwNTgzODY3OH0.QRg9iTPwXuB5BycFWxubXds9TvvALz0r5TDXdSHX20M' },

            body: JSON.stringify({id, title, description})
        })

         let data = await response.json()
         console.log(data)

         let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        <noteContext.Provider value={{ notes, setNotes, editNote, addNote, getAllNotes, deleteNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;