import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> // buat route awal-awal, pertama kali buka web
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
