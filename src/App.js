import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomepageChilli from "./HomepageChilli";
import Profile from "./Profile";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageChilli />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
