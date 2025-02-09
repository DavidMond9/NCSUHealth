import React, { useState } from 'react';
import { useApp } from './AppContext';
import { PieChart } from 'react-minimal-pie-chart';
import './styles/Profile.css';

function Profile() {
    const { state, dispatch } = useApp();

    // Use global profile if available; otherwise use an initial empty object.
    const [profileData, setProfileData] = useState(
        state.profile || {
            name: '',
            gender: '',
            birthDate: '',
            height: '',
            weight: '',
            goal: '', // Expected values: "maintenance", "gaining", "losing"
            timeframe: '',
            activityLevel: '',
            macros: {
                protein: 30,
                carbs: 50,
                fats: 20
            }
        }
    );

    // Check if the profile is complete based on required fields.
    const isComplete =
        profileData.name &&
        profileData.gender &&
        profileData.birthDate &&
        profileData.height &&
        profileData.weight &&
        profileData.goal &&
        profileData.timeframe &&
        profileData.activityLevel;

    // Update the local form state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // When the form is submitted, update the global state
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isComplete) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/update-profile/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profileData),
                });

                if (response.ok) {
                    const updatedProfile = await response.json();
                    dispatch({ type: 'SET_PROFILE', payload: updatedProfile });
                } else {
                    alert('Failed to update profile. Please try again.');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                alert('Network error occurred.');
            }
        } else {
            alert('Please fill out all fields.');
        }
    };

    // If the profile hasn't been set in the global state, show the setup form.
    if (!state.profile) {
        return (
            <div className="profile-section">
                <div className="profile-container">
                    <h1>
                        Hi {profileData.name || 'there'}, We need some info to get you started:
                    </h1>
                    <form onSubmit={handleSubmit} className="profile-setup-form">
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={profileData.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Birth Date:
                            <input
                                type="date"
                                name="birthDate"
                                value={profileData.birthDate}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Gender:
                            <input
                                type="text"
                                name="gender"
                                value={profileData.gender}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Height (cm):
                            <input
                                type="number"
                                name="height"
                                value={profileData.height}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Weight (kg):
                            <input
                                type="number"
                                name="weight"
                                value={profileData.weight}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Goal:
                            <select
                                name="goal"
                                value={profileData.goal}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select...</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="gaining">Gaining</option>
                                <option value="losing">Losing</option>
                            </select>
                        </label>
                        <label>
                            Timeframe:
                            <input
                                type="text"
                                name="timeframe"
                                value={profileData.timeframe}
                                onChange={handleChange}
                                placeholder="e.g., 3 months"
                                required
                            />
                        </label>
                        <label>
                            Activity Level:
                            <input
                                type="text"
                                name="activityLevel"
                                value={profileData.activityLevel}
                                onChange={handleChange}
                                placeholder="e.g., Sedentary, Active"
                                required
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }

    // If the profile is complete (exists in global state), display the profile details.
    const macroData = [
        { title: 'Protein', value: state.profile.macros.protein, color: '#4CAF50' },
        { title: 'Carbs', value: state.profile.macros.carbs, color: '#2196F3' },
        { title: 'Fats', value: state.profile.macros.fats, color: '#FFC107' }
    ];

    return (
        <div className="profile-section">
            <div className="profile-container">
                <h1>Profile</h1>
                <div className="profile-card">
                    <div className="profile-info">
                        <h2>{state.profile.name}</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Gender</label>
                                <span>{state.profile.gender}</span>
                            </div>
                            <div className="info-item">
                                <label>Birth Date</label>
                                <span>{new Date(state.profile.birthDate).toLocaleDateString()}</span>
                            </div>
                            <div className="info-item">
                                <label>Height</label>
                                <span>{state.profile.height} cm</span>
                            </div>
                            <div className="info-item">
                                <label>Weight</label>
                                <span>{state.profile.weight} kg</span>
                            </div>
                            <div className="info-item">
                                <label>Goal</label>
                                <span>{state.profile.goal}</span>
                            </div>
                            <div className="info-item">
                                <label>Timeframe</label>
                                <span>{state.profile.timeframe}</span>
                            </div>
                            <div className="info-item">
                                <label>Activity Level</label>
                                <span>{state.profile.activityLevel}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="macro-chart">
                    <h3>Macro Distribution</h3>
                    <div className="chart-container">
                        <PieChart
                            data={macroData}
                            radius={35}
                            lineWidth={40}
                            paddingAngle={2}
                            label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}%`}
                            labelStyle={{ fontSize: '3px' }}
                        />
                    </div>
                    <div className="macro-legend">
                        {macroData.map((macro) => (
                            <div key={macro.title} className="legend-item">
                                <span
                                    className="color-dot"
                                    style={{ backgroundColor: macro.color }}
                                ></span>
                                <span>
                                    {macro.title}: {macro.value}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
