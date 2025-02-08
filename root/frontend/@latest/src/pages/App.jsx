import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Import style
import './styles/App.css'

// Import your page components
import Home from './Home'
import Auth from './Auth'

// Run app and return page information
function App() {
  return (
    <div>
      <Routes>
        {/* Authentication page */}
        <Route path="/Auth" element={<Auth />} />

        {/* Home page */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
