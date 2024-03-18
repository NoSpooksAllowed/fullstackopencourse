import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("The element root was not found");
}

ReactDOM.createRoot(rootElement).render(<App />);
