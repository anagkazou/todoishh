import React from "react";
import "./App.css";

import { AuthProvider } from "context";
import { BrowserRouter as Router } from "react-router-dom";
import { Views } from "components/Views";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Views />
      </AuthProvider>
    </Router>
  );
}

export default App;
