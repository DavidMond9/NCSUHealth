import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/ExerciseDetail.css';

function ExerciseDetail() {
    const { category } = useParams();
    const navigate = useNavigate();

    // Exercise data organized by category
    const exerciseData = {
        chest: [
            {
                id: 1,
                name: "Bench Press",
                description: "Lie on a flat bench, grip the bar slightly wider than shoulder-width, lower to chest and press up.",
                imageUrl: "https://example.com/bench-press.jpg", // Replace with actual image URL
                setsCompleted: 0,
                totalSets: 9
            },
            {
                id: 2,
                name: "Incline Dumbbell Press",
                description: "Perform on an incline bench with dumbbells for upper chest development.",
                imageUrl: "https://example.com/incline-press.jpg", // Replace with actual image URL
                setsCompleted: 0,
                totalSets: 9
            },
            {
                id: 3,
                name: "Push-Ups",
                description: "Classic bodyweight exercise for chest, shoulders, and triceps.",
                imageUrl: "https://example.com/pushups.jpg", // Replace with actual image URL
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
            },
            // Add more back exercises...
        ],
        cardio: [
            {
                id: 7,
                name: "Treadmill Running",
                description: "30 minutes of steady-state cardio on the treadmill.",
                imageUrl: "https://example.com/treadmill.jpg",
                setsCompleted: 0,
                totalSets: 1
            },
            // Add more cardio exercises...
        ],
        triceps: [
            {
                id: 10,
                name: "Tricep Pushdowns",
                description: "Using a cable machine, push the bar down to work the triceps.",
                imageUrl: "https://example.com/tricep-pushdown.jpg",
                setsCompleted: 0,
                totalSets: 9
            },
            // Add more tricep exercises...
        ]
    };

    const exercises = exerciseData[category] || [];

    const handleSetComplete = (exerciseId) => {
        // Here you would update the sets completed in your state management system
        console.log(`Completed set for exercise ${exerciseId}`);
    };

    if (!exercises.length) {
        return (
            <div className="exercise-detail">
                <h2>No exercises found for {category}</h2>
                <button onClick={() => navigate('/exercise')}>Back to Exercises</button>
            </div>
        );
    }

    return (
        <div className="exercise-detail">
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
                        <p>{exercise.description}</p>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExerciseDetail; 

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import './styles/ExerciseDetail.css';

// function ExerciseDetail({ categories }) {
//     const { category } = useParams();

//     const exerciseData = {
//         chest: [
//             { id: 1, name: "Bench Press", description: "Lie on a flat bench, grip the bar slightly wider than shoulder-width, lower to chest and press up.", imageUrl: "https://example.com/bench-press.jpg", setsCompleted: 0, totalSets: 9 },
//             { id: 2, name: "Incline Dumbbell Press", description: "Perform on an incline bench with dumbbells for upper chest development.", imageUrl: "https://example.com/incline-press.jpg", setsCompleted: 0, totalSets: 9 },
//             { id: 3, name: "Push-Ups", description: "Classic bodyweight exercise for chest, shoulders, and triceps.", imageUrl: "https://example.com/pushups.jpg", setsCompleted: 0, totalSets: 9 }
//         ],
//         back: [
//             { id: 4, name: "Pull-Ups", description: "Grip the bar overhead and pull yourself up until your chin is over the bar.", imageUrl: "https://example.com/pullups.jpg", setsCompleted: 0, totalSets: 9 }
//         ]
//     };

//     const exercises = exerciseData[category] || [];

//     if (!exercises.length) {
//         return (
//             <div className="exercise-detail">
//                 <h2>No exercises found for {category}</h2>
//             </div>
//         );
//     }

//     return (
//         <div className="exercise-detail">
//             <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Exercises</h2>
//             <div className="exercise-grid">
//                 {exercises.map(exercise => (
//                     <div key={exercise.id} className="exercise-card">
//                         <h3>{exercise.name}</h3>
//                         <img
//                             src={exercise.imageUrl}
//                             alt={exercise.name}
//                             onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=Exercise+Image'}
//                         />
//                         <p>{exercise.description}</p>
//                         <div className="sets-counter">
//                             Sets completed: {exercise.setsCompleted}/{exercise.totalSets}
//                         </div>
//                         <button className="set-button">
//                             Complete Set
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ExerciseDetail;
