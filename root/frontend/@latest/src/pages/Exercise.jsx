import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Exercise.css';

function Exercise() {
    const [exercises, setExercises] = useState({
        title: "Chest and Triceps",
        isCompleted: false,
        categories: [
            {
                name: "Chest",
                setsCompleted: 0,
                totalSets: 9
            },
            {
                name: "Triceps",
                setsCompleted: 0,
                totalSets: 9
            }
        ]
    });

    const [nutrition, setNutrition] = useState({
        calories: { current: 0, target: 2000 },
        protein: { current: 0, target: 150 },
        water: { current: 0, target: 8 }
    });

    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/Home/exercise/${category.toLowerCase()}`);
    };

    const updateSets = (categoryIndex) => {
        setExercises(prev => {
            const updatedCategories = [...prev.categories];
            if (updatedCategories[categoryIndex].setsCompleted < updatedCategories[categoryIndex].totalSets) {
                updatedCategories[categoryIndex].setsCompleted += 1;
            }

            // Check if all categories are completed
            const allCompleted = updatedCategories.every(cat =>
                cat.setsCompleted === cat.totalSets
            );

            return {
                ...prev,
                categories: updatedCategories,
                isCompleted: allCompleted
            };
        });
    };

    return (
        <div className="exercise-container">
            <div className="exercise-sidebar">
                <h3>Exercise Categories</h3>
                <ul>
                    <li onClick={() => handleCategoryClick('chest')}>Chest</li>
                    <li onClick={() => handleCategoryClick('back')}>Back</li>
                    <li onClick={() => handleCategoryClick('triceps')}>Triceps</li>
                    <li onClick={() => handleCategoryClick('cardio')}>Cardio</li>
                </ul>
            </div>

            <div className="exercise-main">
                <div className="exercise-header">
                    <h2>{exercises.title}</h2>
                    <input
                        type="checkbox"
                        checked={exercises.isCompleted}
                        readOnly
                    />
                </div>

                <div className="exercise-list">
                    {exercises.categories.map((category, index) => (
                        <div key={index} className="exercise-item">
                            <span>{index + 1}) {category.totalSets} sets of {category.name}</span>
                            <div className="sets-counter">
                                {category.setsCompleted}/{category.totalSets}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="nutrition-tracker">
                    <div className="progress-bar">
                        <label>Calories</label>
                        <progress value={nutrition.calories.current} max={nutrition.calories.target} />
                        <span>{nutrition.calories.current}/{nutrition.calories.target}</span>
                    </div>
                    <div className="progress-bar">
                        <label>Protein (g)</label>
                        <progress value={nutrition.protein.current} max={nutrition.protein.target} />
                        <span>{nutrition.protein.current}/{nutrition.protein.target}</span>
                    </div>
                    <div className="progress-bar">
                        <label>Water (cups)</label>
                        <progress value={nutrition.water.current} max={nutrition.water.target} />
                        <span>{nutrition.water.current}/{nutrition.water.target}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exercise;
