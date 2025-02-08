import React from 'react';
import { Outlet, Link } from 'react-router-dom';
// Import the logo if it's inside the src folder. Adjust the path as necessary.
import logo from './assets/NCSUHealth.png';

function Home() {
    return (
        <div className="home-container">
            {/* Logo fixed in the top left corner */}
            <div
                className="logo-container"
                style={{
                    position: 'fixed',
                    top: '10px',
                    left: '10px',
                    zIndex: 1000 // Ensures the logo appears above other content
                }}
            >
                <img
                    src={logo}  // If your logo is in the public folder, use src="/assets/logo.png" instead.
                    alt="Logo"
                    style={{ width: '50px', height: 'auto' }}
                />
            </div>

            {/* Add any content here if need to be seen in all pages TODO */}

            {/* Outlet for nested routes */}
            <Outlet />

            {/* Bottom Navigation */}
            <nav className="bottom-nav">
                <Link to="profile">Profile</Link>
                <Link to="nutrition">Nutrition</Link>
                <Link to="exercise">Exercise</Link>
                <Link to="settings">Settings</Link>
            </nav>
        </div>
    );
}

export default Home;
