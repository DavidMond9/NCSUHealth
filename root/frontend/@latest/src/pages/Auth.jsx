import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Auth.css';
import { useApp } from './AppContext';

function Auth() {
    const { dispatch } = useApp();
    // State to track whether we're showing the login form or the register form
    const [isLoginView, setIsLoginView] = useState(true);

    // Initialize the navigate function
    const navigate = useNavigate();
    // Add local state so you can read the input values
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle the form submit. This is just an example stub.
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoginView) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/login/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        password
                    })
                });

                const data = await response.json();
                
                if (response.ok) {
                    // Store username in localStorage
                    localStorage.setItem('username', username);
                    
                    // Fetch user profile data
                    const profileResponse = await fetch(`http://127.0.0.1:8000/api/get-profile/${username}/`);
                    const profileData = await profileResponse.json();
                    
                    if (profileResponse.ok) {
                        // Update global state with profile data
                        dispatch({ type: 'SET_PROFILE', payload: profileData });
                    }
                    
                    console.log('Login successful');
                    navigate('/Home/profile');
                } else {
                    console.error('Login error:', data.error);
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        } else {
            // Handle registration logic here
            console.log('Registering...');
            try {
                const response = await fetch('http://127.0.0.1:8000/api/register/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                });
                const data = await response.json();
                if (!response.ok) {
                    console.error('Registration error:', data.error);
                } else {
                    console.log('Registration success:', data.message);
                    // Store username in localStorage
                    localStorage.setItem('username', username);
                    // Explicitly set profile to null for new registrations
                    dispatch({ type: 'SET_PROFILE', payload: null });
                    // Navigate to profile setup page
                    navigate('/Home/profile');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        }
    };

    return (
        <div className="landing-page">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to NCSUHealth</h1>
                    <p className="hero-subtitle">Your Personal Fitness Journey with the Wolfpack</p>
                </div>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <i className="fas fa-dumbbell"></i>
                    <h3>Personalized Workouts</h3>
                    <p>Custom exercise plans tailored to your fitness goals</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-chart-line"></i>
                    <h3>Track Progress</h3>
                    <p>Monitor your fitness journey with detailed analytics</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-users"></i>
                    <h3>Community Support</h3>
                    <p>Connect with fellow Wolfpack members</p>
                </div>
            </div>

            <div className="auth-section">
                <div className="auth-container">
                    <h2>{isLoginView ? 'Login' : 'Register'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>

                        {!isLoginView && (
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <button type="submit" className="auth-button">
                            {isLoginView ? 'Login' : 'Register'}
                        </button>
                    </form>

                    <p className="auth-toggle">
                        {isLoginView ? "Don't have an account?" : 'Already have an account?'}
                        <button
                            type="button"
                            onClick={() => setIsLoginView(!isLoginView)}
                            className="toggle-button"
                        >
                            {isLoginView ? 'Register Here' : 'Login Here'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Auth;