import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Contact from './components/Contact'
import MainPage from './pages/MainPage'
import Presensi from './pages/Presensi'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> // buat route awal-awal, pertama kali buka web */}
        <Route path="/" element={<MainPage />} /> // buat route awal-awal, pertama kali buka web
        <Route path="/admin" element={<MainPage />} /> // buat route awal-awal, pertama kali buka web
        <Route path="/presensi" element={<Presensi />} /> // buat route awal-awal, pertama kali buka web
        <Route path="/login" element={<Login />} />
        {/* <Route path="/contact" element={<Contact/>}/> */}
      </Routes>
    </Router>
  )
}

export default App
