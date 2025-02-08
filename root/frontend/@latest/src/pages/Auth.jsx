import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Auth.css';

function Auth() {
    // State to track whether we're showing the login form or the register form
    const [isLoginView, setIsLoginView] = useState(true);

    // Initialize the navigate function
    const navigate = useNavigate();

    // Handle the form submit. This is just an example stub.
    const handleSubmit = (event) => {
        event.preventDefault();

        if (isLoginView) {
            // Handle login logic here
            console.log('Logging in...');
            // After successful login, redirect to Home
            navigate('/Home');
        } else {
            // Handle registration logic here
            console.log('Registering...');
            // Optionally, redirect after registration or perform other actions
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
                            <input id="username" type="text" required />
                        </div>

                        {!isLoginView && (
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" required />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" required />
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