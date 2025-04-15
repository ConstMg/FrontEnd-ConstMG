import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import SignUp from './pages/SignUP'
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
