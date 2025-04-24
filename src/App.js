import "./App.css";
import SetStateParams from "./components/SetStateParams/index.tsx";
import TabsChangeUrl from "./components/TabsChangeUrl/index.tsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <SetStateParams />
    </BrowserRouter>
  );
};

export default App;
