// App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Contact from "./components/Contact";
import Admin from "./pages/Admin";
import MainPage from "./pages/MainPage";
import Presensi from "./pages/Presensi";
import Project from "./pages/ProjectGallery";

import ProjectDetail from "./pages/ProjectDetail";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RedirectToPage from "./components/RedirectToPage";

function App() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                draggable={true}
                theme="colored"
            />

            <Routes>
                <Route path="/" element={<RedirectToPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/presensi" element={<Presensi />} />
                <Route path="/login" element={<Login />} />
                <Route path="/project" element={<Project />} />
                <Route
                    path="/project/:projectName"
                    element={<ProjectDetail />}
                />
                {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
        </>
    );
}

export default App;
