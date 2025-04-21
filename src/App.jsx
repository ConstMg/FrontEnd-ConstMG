import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css'

function App() {

  return (
    // <div>
    //   <Login/>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> // buat route awal-awal, pertama kali buka web
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
