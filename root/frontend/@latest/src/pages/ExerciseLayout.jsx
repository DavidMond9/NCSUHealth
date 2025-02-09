import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './styles/Exercise.css';

function ExerciseLayout() {
    const navigate = useNavigate();

    return (
        <div className="exercise-container">
            {/* Sidebar for Exercise Categories */}
            <div className="exercise-sidebar">
                <h3>Exercise Categories</h3>
                <ul>
                    <li onClick={() => navigate('/Home/exercise/chest')}>Chest</li>
                    <li onClick={() => navigate('/Home/exercise/back')}>Back</li>
                    <li onClick={() => navigate('/Home/exercise/triceps')}>Triceps</li>
                    <li onClick={() => navigate('/Home/exercise/cardio')}>Cardio</li>
                </ul>
            </div>

            {/* Dynamic Content: Either Exercise or ExerciseDetail */}
            <div className="exercise-main">
                <Outlet />
            </div>

            {/* Bottom Navigation */}
            <div className="bottom-navigation">
                <button onClick={() => navigate('/profile')}>Profile</button>
                <button onClick={() => navigate('/nutrition')}>Nutrition</button>
                <button onClick={() => navigate('/exercise')}>Exercise</button>
                <button onClick={() => navigate('/settings')}>Settings</button>
            </div>
        </div>
    );
}

export default ExerciseLayout;
