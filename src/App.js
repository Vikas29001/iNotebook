import './App.css';
import Navbar from './components//Navbar';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from './components/Home';
import NoteState from './context/NoteState';
import AlertBox from './components/AlertBox';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
    <NoteState>
    <div className="App">
      <Router>
      <Navbar/>
      <AlertBox msg="This is iNotebook Application"/>
      <h1>This is iNotebook Application</h1>
      <Routes>
      <Route exact path="/home" element={<Home/>} />
      </Routes>
      <Routes>
      <Route exact path="/login" element={<Login/>} />
      </Routes>
      <Routes>
      <Route exact path="/signup" element={<Signup/>} />
      </Routes>
      </Router>
    </div>
    </NoteState>
    </>
  );
}

export default App;
