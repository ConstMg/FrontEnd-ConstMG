import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login'
import SignUp from './SignUP'
import './App.css'

function App() {

  return (
    // <div>
    //   <Login/>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> // buat route awal-awal, pertama kali buka web
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
