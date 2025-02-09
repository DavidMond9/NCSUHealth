import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from './AppContext';
import './styles/Exercise.css';

function Exercise() {
    const { state } = useApp();
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

    const navigate = useNavigate();

    // Calculate nutrition totals for today
    const calculateNutritionTotals = () => {
        const todaysFoods = state.nutrition.foodLog[new Date().toISOString().split('T')[0]] || [];
        return todaysFoods.reduce((totals, food) => ({
            calories: totals.calories + (food.calories || 0),
            protein: totals.protein + (food.protein || 0),
            water: totals.water + (food.water || 0)
        }), { calories: 0, protein: 0, water: 0 });
    };

    const handleCategoryClick = (category) => {
        navigate(`/exercise/${category.toLowerCase()}`);
    };

    const updateSets = (categoryIndex) => {
        setExercises(prev => {
            const updatedCategories = [...prev.categories];
            if (updatedCategories[categoryIndex].setsCompleted < updatedCategories[categoryIndex].totalSets) {
                updatedCategories[categoryIndex].setsCompleted += 1;
            }

            return {
                ...prev,
                categories: updatedCategories,
                isCompleted: updatedCategories.every(cat => cat.setsCompleted === cat.totalSets)
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
                    <h3>Today's Nutrition Progress</h3>
                    <div className="progress-bar">
                        <label>Calories</label>
                        <progress 
                            value={calculateNutritionTotals().calories} 
                            max={state.profile?.daily_calories || 2000} 
                        />
                        <span>
                            {calculateNutritionTotals().calories} / {state.profile?.daily_calories || 2000} kcal
                        </span>
                    </div>
                    <div className="progress-bar">
                        <label>Protein</label>
                        <progress 
                            value={calculateNutritionTotals().protein} 
                            max={state.profile?.macros?.protein || 150} 
                        />
                        <span>
                            {calculateNutritionTotals().protein} / {state.profile?.macros?.protein || 150}g
                        </span>
                    </div>
                    <div className="progress-bar">
                        <label>Water</label>
                        <progress 
                            value={calculateNutritionTotals().water} 
                            max={state.profile?.daily_water || 8} 
                        />
                        <span>
                            {calculateNutritionTotals().water} / {state.profile?.daily_water || 8} cups
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exercise;
