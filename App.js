import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import HydroponicsMonitor from "./HydroponicsMonitor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/monitor/:plantId" element={<HydroponicsMonitor />} />
      </Routes>
    </Router>
  );
}

export default App;
