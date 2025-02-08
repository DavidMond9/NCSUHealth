import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import style
import './styles/App.css';

// Import your page components
import Home from './Home';
import Auth from './Auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication page */}
        <Route path="/Auth" element={<Auth />} />

        {/* Home page */}
        <Route path="/Home" element={<Home />} />

        {/* Optionally, add a default route */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
