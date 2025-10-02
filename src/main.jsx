import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Importa los estilos de FirebaseUI
import "firebaseui/dist/firebaseui.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
