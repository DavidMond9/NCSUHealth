import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            {/* Main content */}
            <div className="content">
                <h1>NCSUHealth</h1>
                <p>This is a basic HTML layout with bottom navigation tabs. You can add your content here.</p>
            </div>

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

