import React from 'react';
import './App.css'; // We'll move the CSS here

function App() {
  return (
    <div>
      {/* Main content */}
      <div className="content">
        <h1>NCSUHealth</h1>
        <p>This is a basic HTML layout with bottom navigation tabs. You can add your content here.</p>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <a href="#profile">Profile</a>
        <a href="#nutrition">Nutrition</a>
        <a href="#exercise">Exercise</a>
        <a href="#settings">Settings</a>
      </nav>
    </div>
  );
}

export default App;
