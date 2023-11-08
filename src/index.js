import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Libarary Fils
import "./Style/Libs/regular/style.css";
import "./Style/Libs/duotone/style.css";
import "./Style/Libs/fill/style.css";
// Style File
import "./Style/main.css";
// App File
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
