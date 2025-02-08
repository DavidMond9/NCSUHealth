import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import './styles/Profile.css'

function Profile() {
    // This would come from your global state
    const profile = {
        name: 'John Doe',
        gender: 'Male',
        birthDate: '1990-01-01',
        height: '180',
        weight: '75',
        goal: 'maintaining',
        macros: {
            protein: 30,
            carbs: 50,
            fats: 20
        }
    }

    const macroData = [
        { title: 'Protein', value: profile.macros.protein, color: '#4CAF50' },
        { title: 'Carbs', value: profile.macros.carbs, color: '#2196F3' },
        { title: 'Fats', value: profile.macros.fats, color: '#FFC107' }
    ]

    return (
        <div className="profile-page">
            <h1>Profile</h1>

            <div className="profile-card">
                <div className="profile-info">
                    <h2>{profile.name}</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Gender</label>
                            <span>{profile.gender}</span>
                        </div>
                        <div className="info-item">
                            <label>Birth Date</label>
                            <span>{new Date(profile.birthDate).toLocaleDateString()}</span>
                        </div>
                        <div className="info-item">
                            <label>Height</label>
                            <span>{profile.height} cm</span>
                        </div>
                        <div className="info-item">
                            <label>Weight</label>
                            <span>{profile.weight} kg</span>
                        </div>
                        <div className="info-item">
                            <label>Goal</label>
                            <span>{profile.goal}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="macro-chart">
                <h3>Macro Distribution</h3>
                <div className="chart-container">
                    <PieChart
                        data={macroData}
                        lineWidth={40}
                        paddingAngle={2}
                        label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}%`}
                        labelStyle={{ fontSize: '5px' }}
                    />
                </div>
                <div className="macro-legend">
                    {macroData.map((macro) => (
                        <div key={macro.title} className="legend-item">
                            <span className="color-dot" style={{ backgroundColor: macro.color }}></span>
                            <span>{macro.title}: {macro.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile;
