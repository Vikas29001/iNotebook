import React, {useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Navbar =()=>  {
  let navigate = useNavigate()
  let NavLogout = () => { navigate("/login"); }
 
    let location = useLocation();
    useEffect(() => {
      console.log(location.pathname)
    }, [location])

    let handleLogout =()=>{
      localStorage.removeItem('token')
      NavLogout()
    }
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <div className="container-fluid">
            <Link className="navbar-brand" to="">iNoteBook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/home"?"active":""}`} aria-current="page" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/about"?"active":""}`} to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/contact"?"active":""}`} to="/contact">Contact Us</Link>
                </li>
              </ul>
              {!localStorage.getItem('token')?<form className="d-flex" role="search">
                {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                <Link className='btn btn-primary mx-2' to='/login' role='button'>Login</Link>
                <Link className='btn btn-primary mx-2' to='/signup' role='button'>Signup</Link>
              </form>:<button className="btn btn-outline-success" onClick={handleLogout} >logout</button>
              }
            </div>
          </div>
        </nav>
      </>
    )
  }

export default Navbar
