import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let [cred, setCred] = useState({ email: "", password: "" });
    let navigate = useNavigate()
    let Nav = () => { navigate("/home"); }

    const handleSubmit = async (e) => {
        e.preventDefault()


        let url = 'http://localhost:5000/api/auth/loginUser';
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        })
        let data = await response.json();
        let data1 = JSON.stringify(data)
        console.log(data)
        // console.log(data.authtoken)
        // if(data){
        localStorage.setItem('token', data1)
        //         navigate("/home");
        Nav();

        // }
    }

    let onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={cred.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={cred.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default Login
