import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Contact from "./components/Contact";
import Admin from "./pages/Admin";
import MainPage from "./pages/MainPage";
import Presensi from "./pages/Presensi";
import Project from "./pages/ProjectPage";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import RedirectToPage from "./components/RedirectToPage";
function App() {
  
  return (
    <Router>
      <ToastContainer
        position="top-right" // Posisi toast
        autoClose={3000} // Waktu tampil (ms)
        hideProgressBar={false} // Tampilkan/hilangkan progress bar
        newestOnTop={true} // Toast terbaru tampil di atas
        closeOnClick={true} // Tutup saat diklik
        rtl={false} // Arah teks (right-to-left)
        // pauseOnFocusLoss={true} // Jeda saat kehilangan fokus
        draggable={true} // Bisa digeser user
        // pauseOnHover={true} // Jeda saat hover
        theme="colored" // Tema: "light" | "dark" | "colored"
      />

      <Routes>
        {/* Redirect handler saat pertama buka web */}
        <Route path="/" element={<RedirectToPage />} />
        {/* <Route path="/redirect" element={<RedirectToPage />} /> */}
        <Route path="/main" element={<MainPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/presensi" element={<Presensi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project" element={<Project />} />
        {/* <Route path="/contact" element={<Contact/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
