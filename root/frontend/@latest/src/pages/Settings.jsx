import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Settings.css';

function Settings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    const [profileData, setProfileData] = useState({
        age: 25,
        weight: 70,
        height: 175,
        fitnessGoal: 'build-muscle',
        activityLevel: 'moderate'
    });

    const [accountData, setAccountData] = useState({
        username: 'johndoe',
        email: 'john@example.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [preferences, setPreferences] = useState({
        notifications: true,
        darkMode: false,
        language: 'english',
        measurementUnit: 'metric'
    });

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // API call to update profile
        console.log('Profile updated:', profileData);
    };

    const handleAccountUpdate = (e) => {
        e.preventDefault();
        // API call to update account
        console.log('Account updated:', accountData);
    };

    const handlePreferencesUpdate = (e) => {
        e.preventDefault();
        // API call to update preferences
        console.log('Preferences updated:', preferences);
    };

    const handleLogout = () => {
        // Clear local storage/cookies
        // Redirect to login page
        navigate('/Auth');
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
                        <li
                            className={`sidebar-item ${activeTab === 'preferences' ? 'active' : ''}`}
                            onClick={() => setActiveTab('preferences')}
                        >
                            <i className="fas fa-cog"></i>
                            <span>Preferences</span>
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
                                            type="number"
                                            value={profileData.age}
                                            onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Weight (kg)</label>
                                        <input
                                            type="number"
                                            value={profileData.weight}
                                            onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Height (cm)</label>
                                        <input
                                            type="number"
                                            value={profileData.height}
                                            onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Fitness Goal</label>
                                        <select
                                            value={profileData.fitnessGoal}
                                            onChange={(e) => setProfileData({ ...profileData, fitnessGoal: e.target.value })}
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
                                    <p>Manage your account credentials and security</p>
                                </div>
                                <form onSubmit={handleAccountUpdate}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            value={accountData.username}
                                            onChange={(e) => setAccountData({ ...accountData, username: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={accountData.email}
                                            onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Current Password</label>
                                        <input
                                            type="password"
                                            value={accountData.currentPassword}
                                            onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            value={accountData.newPassword}
                                            onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            value={accountData.confirmPassword}
                                            onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit">Update Account</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'preferences' && (
                            <div className="settings-section">
                                <div className="section-header">
                                    <h3>Preferences</h3>
                                    <p>Customize your app experience</p>
                                </div>
                                <form onSubmit={handlePreferencesUpdate}>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={preferences.notifications}
                                                onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                                            />
                                            Enable Notifications
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={preferences.darkMode}
                                                onChange={(e) => setPreferences({ ...preferences, darkMode: e.target.checked })}
                                            />
                                            Dark Mode
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>Language</label>
                                        <select
                                            value={preferences.language}
                                            onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                                        >
                                            <option value="english">English</option>
                                            <option value="spanish">Spanish</option>
                                            <option value="french">French</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Measurement Unit</label>
                                        <select
                                            value={preferences.measurementUnit}
                                            onChange={(e) => setPreferences({ ...preferences, measurementUnit: e.target.value })}
                                        >
                                            <option value="metric">Metric (kg/cm)</option>
                                            <option value="imperial">Imperial (lb/in)</option>
                                        </select>
                                    </div>
                                    <button type="submit">Save Preferences</button>
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
