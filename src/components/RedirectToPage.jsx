// components/RedirectToPage.jsx
import { Navigate } from "react-router-dom";

const RedirectToPage = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const role = sessionStorage.getItem("userRole");
  if (isLoggedIn === "true" && role === "karyawan") {
    return <Navigate to='/main' replace />;
  } else if (isLoggedIn === "true" && role === "admin") {
    return <Navigate to='/admin' replace />;
  }

  return <Navigate to='/main' replace />;
};

export default RedirectToPage;
