import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "./utils/history.js";
import { ToastContainer } from "react-toastify";
import { Provider } from "./context/Context"; // ✅ import Provider

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider>
            <HistoryRouter history={history}>
                <App />
                <ToastContainer /> {/* Kalau belum, tambahkan ini juga */}
            </HistoryRouter>
        </Provider>
    </StrictMode>
);
