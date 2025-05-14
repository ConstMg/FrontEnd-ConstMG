import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Contact from "./components/Contact";
import MainPage from "./pages/MainPage";
import Presensi from "./pages/Presensi";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import RedirectToPage from "./components/RedirectToPage";
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect handler saat pertama buka web */}
        <Route path="/" element={<RedirectToPage />} />
        {/* <Route path="/redirect" element={<RedirectToPage />} /> */}
        <Route path="/main" element={<MainPage />} />
        <Route path="/admin" element={<MainPage />} />
        <Route path="/presensi" element={<Presensi />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/contact" element={<Contact/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
