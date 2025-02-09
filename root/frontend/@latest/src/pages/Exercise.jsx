import React, { useState, useEffect } from 'react';
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

    const [exerciseProgress, setExerciseProgress] = useState({
        setsCompleted: 0,
        totalSets: 18
    });

    // Add state for nutrition totals
    const [nutritionTotals, setNutritionTotals] = useState({
        calories: 0,
        protein: 0,
        water: 0
    });

    // Update nutrition totals when state.nutrition changes
    useEffect(() => {
        if (state.nutrition?.foodLog) {
            const totals = calculateNutritionTotals();
            setNutritionTotals(totals);
        }
    }, [state.nutrition]);

    // Calculate nutrition totals for today
    const calculateNutritionTotals = () => {
        const todaysFoods = state.nutrition?.foodLog[new Date().toISOString().split('T')[0]] || [];
        return todaysFoods.reduce((totals, food) => ({
            calories: totals.calories + (food.calories || 0),
            protein: totals.protein + (food.protein || 0),
            water: totals.water + (food.water || 0)
        }), { calories: 0, protein: 0, water: 0 });
    };

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

            const newState = {
                ...prev,
                categories: updatedCategories,
                isCompleted: updatedCategories.every(cat => cat.setsCompleted === cat.totalSets)
            };

            // Update exercise progress separately
            const totalSetsCompleted = updatedCategories.reduce((total, cat) => total + cat.setsCompleted, 0);
            setExerciseProgress({
                setsCompleted: totalSetsCompleted,
                totalSets: exerciseProgress.totalSets
            });

            return newState;
        });
    };

    return (
        <div className="exercise-page">
            <div className="exercise-sidebar">
                    <h3>Exercise Categories</h3>
                    <ul>
                        <li onClick={() => handleCategoryClick('chest')}>Chest</li>
                        <li onClick={() => handleCategoryClick('back')}>Back</li>
                        <li onClick={() => handleCategoryClick('triceps')}>Triceps</li>
                        <li onClick={() => handleCategoryClick('cardio')}>Cardio</li>
                    </ul>
                </div>
            <div className="exercise-container">
                

                <div className="exercise-main">
                    <div className="exercise-header">
                        <h2>{exercises.title}</h2>
                        <input
                            type="checkbox"
                            checked={exercises.isCompleted}
                            readOnly
                        />
                    </div>

                    {/* Add Exercise Progress Bar */}
                    <div className="progress-section">
                        <h3>Workout Progress</h3>
                        <div className="progress-bar">
                            <label>Sets Completed</label>
                            <progress 
                                value={exerciseProgress.setsCompleted} 
                                max={exerciseProgress.totalSets} 
                            />
                            <span>
                                {exerciseProgress.setsCompleted} / {exerciseProgress.totalSets} sets
                            </span>
                        </div>
                    </div>

                    <div className="exercise-list">
                        {exercises.categories.map((category, index) => (
                            <div key={index} className="exercise-item">
                                <span>{index + 1}) {category.totalSets} sets of {category.name}</span>
                                <div className="sets-counter">
                                    <span>{category.setsCompleted}/{category.totalSets}</span>
                                    <button 
                                        onClick={() => updateSets(index)}
                                        disabled={category.setsCompleted === category.totalSets}
                                    >
                                        Complete Set
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="nutrition-tracker">
                        <h3>Today's Nutrition Progress</h3>
                        <div className="progress-bar">
                            <label>Calories</label>
                            <progress 
                                value={nutritionTotals.calories} 
                                max={state.profile?.daily_calories || 2000} 
                            />
                            <span>
                                {nutritionTotals.calories} / {state.profile?.daily_calories || 2000} kcal
                            </span>
                        </div>
                        <div className="progress-bar">
                            <label>Protein</label>
                            <progress 
                                value={nutritionTotals.protein} 
                                max={state.profile?.macros?.protein || 150} 
                            />
                            <span>
                                {nutritionTotals.protein} / {state.profile?.macros?.protein || 150}g
                            </span>
                        </div>
                        <div className="progress-bar">
                            <label>Water</label>
                            <progress 
                                value={nutritionTotals.water} 
                                max={state.profile?.daily_water || 8} 
                            />
                            <span>
                                {nutritionTotals.water} / {state.profile?.daily_water || 8} cups
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exercise;
