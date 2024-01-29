import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

const Signup =  () => {
    let [cred, setCred] = useState({ name: "", email: "", password: "" });
    // let navigate  = useNavigate()
    let {name, email, password} = cred;
    const handleSubmit = async (e) => {
        e.preventDefault()
     
        let url = 'http://localhost:5000/api/auth/createUser';
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, email, password})
        })
        let data = await response.json();
        console.log(data)
   
    }

    let onChange = (e) => {
        setCred({...cred,[e.target.name]: e.target.value})
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                 
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                  
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default Signup;

