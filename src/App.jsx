import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import MainPage from "./pages/MainPage";
import Presensi from "./pages/Presensi";
import Project from "./pages/ProjectGallery";
import ProjectDetail from "./pages/ProjectDetail";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import RedirectToPage from "./components/RedirectToPage";
import EditProfile from "./components/EditProfile";

function App() {
    return (
        <>
            
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
                <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
        </>
    );
}

export default App;
