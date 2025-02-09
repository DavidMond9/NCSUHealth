import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/ExerciseDetail.css';

function ExerciseDetail() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [selectedExercise, setSelectedExercise] = useState(null); // State to handle the selected exercise

    const exerciseData = {
        chest: [
            {
                id: 1,
                name: "Bench Press",
                description: "Lie on a flat bench, grip the bar slightly wider than shoulder-width, lower to chest and press up.",
                imageUrl: "https://example.com/bench-press.jpg",
                setsCompleted: 0,
                totalSets: 9
            },
            {
                id: 2,
                name: "Incline Dumbbell Press",
                description: "Perform on an incline bench with dumbbells for upper chest development.",
                imageUrl: "https://example.com/incline-press.jpg",
                setsCompleted: 0,
                totalSets: 9
            },
            {
                id: 3,
                name: "Push-Ups",
                description: "Classic bodyweight exercise for chest, shoulders, and triceps.",
                imageUrl: "https://example.com/pushups.jpg",
                setsCompleted: 0,
                totalSets: 9
            }
        ],
        back: [
            {
                id: 4,
                name: "Pull-Ups",
                description: "Grip the bar overhead and pull yourself up until your chin is over the bar.",
                imageUrl: "https://example.com/pullups.jpg",
                setsCompleted: 0,
                totalSets: 9
            }
        ],
        cardio: [
            {
                id: 7,
                name: "Treadmill Running",
                description: "30 minutes of steady-state cardio on the treadmill.",
                imageUrl: "https://example.com/treadmill.jpg",
                setsCompleted: 0,
                totalSets: 1
            }
        ],
        triceps: [
            {
                id: 10,
                name: "Tricep Pushdowns",
                description: "Using a cable machine, push the bar down to work the triceps.",
                imageUrl: "https://example.com/tricep-pushdown.jpg",
                setsCompleted: 0,
                totalSets: 9
            }
        ]
    };

    const exercises = exerciseData[category] || [];

    const handleSetComplete = (exerciseId) => {
        console.log(`Completed set for exercise ${exerciseId}`);
    };

    if (!exercises.length) {
        return (
            <div className="exercise-detail">
                <h2>No exercises found for {category}</h2>
                <button onClick={() => navigate('/Home/exercise')}>Back to Exercises</button>
            </div>
        );
    }

    return (
        <div className="exercise-page">
            <aside className="exercise-sidebar">
                <h3>Exercise Categories</h3>
                <ul>
                    <li onClick={() => navigate('/Home/exercise/chest')}>Chest</li>
                    <li onClick={() => navigate('/Home/exercise/back')}>Back</li>
                    <li onClick={() => navigate('/Home/exercise/triceps')}>Triceps</li>
                    <li onClick={() => navigate('/Home/exercise/cardio')}>Cardio</li>
                </ul>
            </aside>

            <div className="exercise-container">
                <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Exercises</h2>
                <div className="exercise-grid">
                    {exercises.map(exercise => (
                        <div key={exercise.id} className="exercise-card">
                            <h3>{exercise.name}</h3>
                            <img
                                src={exercise.imageUrl}
                                alt={exercise.name}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Exercise+Image';
                                }}
                            />
                            <div className="sets-counter">
                                Sets completed: {exercise.setsCompleted}/{exercise.totalSets}
                            </div>
                            <button
                                className="set-button"
                                onClick={() => handleSetComplete(exercise.id)}
                                disabled={exercise.setsCompleted >= exercise.totalSets}
                            >
                                Complete Set
                            </button>
                            <button
                                className="set-button description-button"
                                onClick={() => setSelectedExercise(exercise)}
                            >
                                Description
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Exercise Description */}
            {selectedExercise && (
                <div className="modal-overlay" onClick={() => setSelectedExercise(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedExercise.name}</h3>
                        <p>{selectedExercise.description}</p>
                        <button
                            className="set-button close-modal"
                            onClick={() => setSelectedExercise(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExerciseDetail;
