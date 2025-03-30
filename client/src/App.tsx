// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, RuleBook } from "./pages";

function App() {
  return (
    <Router basename='thats-my-cow'>
      <nav>
        <Link to="/">Home</Link> | <Link to="/rulebook">Rule Book</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rulebook" element={<RuleBook />} />
      </Routes>
    </Router>
  );
}

export default App;
