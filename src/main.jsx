import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AppProviders } from "./app/providers.jsx";
import { GlobalStyle } from "./styles/globalStyle.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <GlobalStyle />
        <App />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>
);
