import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from './AppContext';
import './styles/Settings.css';

function Settings() {
    const navigate = useNavigate();
    const { state, dispatch } = useApp();
    const [activeTab, setActiveTab] = useState('profile');

    // Initialize state with empty values
    const [profileData, setProfileData] = useState({
        age: '',
        weight: '',
        height: '',
        fitnessGoal: ''
    });

    const [accountData, setAccountData] = useState({
        username: localStorage.getItem('username') || '',
        email: localStorage.getItem('email') || '',
        newPassword: '',
        confirmPassword: ''
    });

    // Load user data when component mounts
    useEffect(() => {
        if (state.profile) {
            console.log('Profile data:', state.profile);
            
            // Calculate age if birthDate exists (note: using birthDate instead of birth_date)
            let calculatedAge = '';
            if (state.profile.birthDate) {  // Changed from birth_date to birthDate
                const birthYear = new Date(state.profile.birthDate).getFullYear();
                calculatedAge = new Date().getFullYear() - birthYear;
            }

            setProfileData({
                age: calculatedAge ? `${calculatedAge}` : 'Not set',
                weight: state.profile.weight || 70,
                height: state.profile.height || 175,
                fitnessGoal: state.profile.goal || 'build-muscle'
            });
        }
    }, [state.profile]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const username = localStorage.getItem('username');
            if (!username) {
                alert('Please log in first');
                return;
            }

            // Preserve all existing profile data and only update the changed fields
            const updatedProfile = {
                ...state.profile,  // Keep all existing profile data
                username,
                weight: profileData.weight,
                height: profileData.height,
                goal: profileData.fitnessGoal,
                // Explicitly preserve these fields
                name: state.profile.name,
                gender: state.profile.gender,
                birth_date: state.profile.birth_date,
                activity_level: state.profile.activity_level,
                timeframe: state.profile.timeframe,
                macros: state.profile.macros,
                daily_calories: state.profile.daily_calories,
                daily_water: state.profile.daily_water
            };

            const response = await fetch('http://127.0.0.1:8000/api/update-profile/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProfile),
            });

            if (response.ok) {
                // Update the global state with the complete profile data
                dispatch({
                    type: 'UPDATE_PROFILE',
                    payload: updatedProfile
                });
                
                alert('Profile updated successfully!');
            } else {
                const error = await response.json();
                alert('Failed to update profile: ' + error.error);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Network error occurred.');
        }
    };

    const handleAccountUpdate = async (e) => {
        e.preventDefault();
        
        // Get username from localStorage
        const username = localStorage.getItem('username');
        
        if (!username) {
            alert('Please log in first');
            return;
        }

        // Only handle password updates
        if (!accountData.newPassword && !accountData.confirmPassword) {
            alert('Please enter a new password to update.');
            return;
        }

        if (accountData.newPassword !== accountData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/update-account/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,  // Use username from localStorage
                    new_password: accountData.newPassword
                }),
            });

            if (response.ok) {
                alert('Password updated successfully!');
                // Clear password fields after successful update
                setAccountData(prev => ({
                    ...prev,
                    newPassword: '',
                    confirmPassword: ''
                }));
            } else {
                const error = await response.json();
                alert('Failed to update password: ' + error.error);
            }
        } catch (error) {
            console.error('Error updating account:', error);
            alert('Network error occurred.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/logout/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                navigate('/');
            } else {
                alert('Failed to log out. Please try again.');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Network error occurred.');
        }
    };

    return (
        <div className="settings-page">
            <div className="settings-hero">
                <div className="hero-content">
                    <h1>NCSUHealth Settings</h1>
                    <p>Customize your wellness journey with the Wolfpack</p>
                </div>
            </div>

            <div className="settings-container">
                <div className="settings-sidebar">
                    <div className="sidebar-header">
                        <h2>Settings</h2>
                        <p className="sidebar-subtitle">Manage your account</p>
                    </div>
                    <ul>
                        <li
                            className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <i className="fas fa-user"></i>
                            <span>Profile Settings</span>
                        </li>
                        <li
                            className={`sidebar-item ${activeTab === 'account' ? 'active' : ''}`}
                            onClick={() => setActiveTab('account')}
                        >
                            <i className="fas fa-lock"></i>
                            <span>Account Settings</span>
                        </li>
                    </ul>
                    <button className="logout-button" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </div>

                <div className="settings-content">
                    <div className="content-card">
                        {activeTab === 'profile' && (
                            <div className="settings-section">
                                <div className="section-header">
                                    <h3>Profile Settings</h3>
                                    <p>Update your personal information and fitness goals</p>
                                </div>
                                <form onSubmit={handleProfileUpdate}>
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input
                                            type="text"
                                            value={profileData.age ? `${profileData.age} years` : ''}
                                            disabled
                                            className="disabled-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Weight (lb)</label>
                                        <input
                                            type="number"
                                            value={profileData.weight || ''}
                                            onChange={(e) => setProfileData(prev => ({
                                                ...prev,
                                                weight: e.target.value
                                            }))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Height (in)</label>
                                        <input
                                            type="number"
                                            value={profileData.height || ''}
                                            onChange={(e) => setProfileData(prev => ({
                                                ...prev,
                                                height: e.target.value
                                            }))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Fitness Goal</label>
                                        <select
                                            value={profileData.fitnessGoal}
                                            onChange={(e) => setProfileData(prev => ({
                                                ...prev,
                                                fitnessGoal: e.target.value
                                            }))}
                                        >
                                            <option value="build-muscle">Build Muscle</option>
                                            <option value="lose-weight">Lose Weight</option>
                                            <option value="maintain">Maintain</option>
                                        </select>
                                    </div>
                                    <button type="submit">Save Profile</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'account' && (
                            <div className="settings-section">
                                <div className="section-header">
                                    <h3>Account Settings</h3>
                                    <p>Update your password</p>
                                </div>
                                <form onSubmit={handleAccountUpdate}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            value={accountData.username}
                                            disabled
                                            className="disabled-input"
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={accountData.email}
                                            disabled
                                            className="disabled-input"
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            value={accountData.newPassword}
                                            onChange={(e) => setAccountData(prev => ({
                                                ...prev,
                                                newPassword: e.target.value
                                            }))}
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={accountData.confirmPassword}
                                            onChange={(e) => setAccountData(prev => ({
                                                ...prev,
                                                confirmPassword: e.target.value
                                            }))}
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                    <button type="submit">Update Password</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;