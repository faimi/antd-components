import "./App.css";
import TabsChangeUrl from "./components/TabsChangeUrl/index.tsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <TabsChangeUrl />
    </BrowserRouter>
  );
};

export default App;
