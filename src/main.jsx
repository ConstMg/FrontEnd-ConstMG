//main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "./utils/history.js";
import { Provider } from "./context/Context";

// ⬇️ Tambahan untuk React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider>
                <HistoryRouter history={history}>
                    <App />
                    <ToastContainer
                        position="top-right"
                        // autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover={false}
                        theme="colored"
                    />

                </HistoryRouter>
            </Provider>
        </QueryClientProvider>
    </StrictMode>
);
