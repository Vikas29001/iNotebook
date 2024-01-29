import React from 'react';
import Notes from './Notes';
// import noteContext from '../context/noteContext';

const Home = () => {

  return (
    <>
      <div className="container">
        <h1>Here is your actual notes</h1>

        <Notes />
      </div>
    </>
  )

}

export default Home;