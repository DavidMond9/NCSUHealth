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
        console.log('Before update - category sets:', exercises.categories[categoryIndex].setsCompleted); // Debug log

        setExercises(prev => {
            // Only proceed if we haven't reached the total sets
            if (prev.categories[categoryIndex].setsCompleted >= prev.categories[categoryIndex].totalSets) {
                return prev; // Return unchanged state if we've reached the limit
            }

            // Create new categories array with the update
            const updatedCategories = prev.categories.map((cat, idx) => 
                idx === categoryIndex 
                    ? { ...cat, setsCompleted: cat.setsCompleted + 1 }
                    : cat
            );

            // Calculate total sets completed
            const totalSetsCompleted = updatedCategories.reduce(
                (total, cat) => total + cat.setsCompleted, 
                0
            );

            // Update exercise progress in the same update
            setExerciseProgress({
                setsCompleted: totalSetsCompleted,
                totalSets: 18
            });

            console.log('After update - total sets:', totalSetsCompleted); // Debug log

            return {
                ...prev,
                categories: updatedCategories,
                isCompleted: updatedCategories.every(cat => cat.setsCompleted === cat.totalSets)
            };
        });
    };

    const exerciseCategories = {
        chest: [
            {
                name: "Bench Press",
                description: "Fundamental compound exercise for chest development. Lie on a flat bench and press the barbell up and down with controlled movement.",
            },
            {
                name: "Incline Dumbbell Press",
                description: "Targets upper chest muscles. Perform on an incline bench with dumbbells for better range of motion.",
            },
            {
                name: "Pec-Flys",
                description: "Isolation exercise for chest. Use cables or dumbbells to perform a flying motion that stretches and contracts chest muscles.",
            },
            {
                name: "Push-ups",
                description: "Bodyweight exercise that works chest, shoulders, and triceps. Great for building strength and endurance.",
            },
            {
                name: "Dips",
                description: "Compound exercise targeting lower chest, triceps, and shoulders. Perform on parallel bars.",
            },
            {
                name: "Decline Bench",
                description: "Targets lower chest muscles. Perform on a decline bench for varied angle training.",
            }
        ],
        back: [
            {
                name: "Bent Over Rows",
                description: "Compound exercise for back thickness. Bend at hips and pull weight towards lower chest.",
            },
            {
                name: "Lat Pulldowns",
                description: "Machine exercise targeting latissimus dorsi. Pull bar down to upper chest with wide grip.",
            },
            {
                name: "Pull-Ups",
                description: "Bodyweight exercise for back width. Grip bar overhead and pull yourself up.",
            },
            {
                name: "Lat Pullovers",
                description: "Isolation exercise for lats. Lie on bench and pull weight in arc motion over head.",
            }
        ],
        arms: [
            {
                name: "Bicep Curls",
                description: "Classic bicep exercise. Curl weight up with palms facing up for bicep peak.",
            },
            {
                name: "Hammer Curls",
                description: "Targets outer bicep and forearms. Curl with palms facing each other.",
            },
            {
                name: "Tricep Push Downs",
                description: "Cable exercise for triceps. Push bar down with elbows at sides.",
            },
            {
                name: "Skull Crushers",
                description: "Lying tricep extension. Lower weight to forehead and extend arms.",
            }
        ],
        shoulders: [
            {
                name: "Shoulder Press",
                description: "Compound movement for deltoids. Press weight overhead from shoulder level.",
            },
            {
                name: "Rear Delt Flys",
                description: "Targets posterior deltoids. Bend forward and raise weights out to sides.",
            },
            {
                name: "Lateral Raises",
                description: "Isolation for middle deltoids. Raise weights to sides to shoulder level.",
            },
            {
                name: "Face Pulls",
                description: "Targets rear deltoids and upper back. Pull rope to face level.",
            }
        ],
        legs: [
            {
                name: "Squats",
                description: "King of leg exercises. Bend knees and hips to lower body, then stand.",
            },
            {
                name: "Leg Press",
                description: "Machine compound movement. Press weight away with legs while seated.",
            },
            {
                name: "Hamstring Curls",
                description: "Isolation for hamstrings. Curl weight with legs while lying down.",
            },
            {
                name: "Calf Raises",
                description: "Targets calves. Rise up on toes with weight on shoulders.",
            },
            {
                name: "Leg Extensions",
                description: "Isolation for quadriceps. Extend legs from seated position.",
            }
        ],
        abs: [
            {
                name: "Crunches",
                description: "Basic ab exercise. Curl upper body towards knees while lying down.",
            },
            {
                name: "Planks",
                description: "Core stability exercise. Hold position with straight body.",
            }
        ],
        cardio: [
            {
                name: "Running",
                description: "Basic cardio exercise. Run at steady pace or intervals.",
            },
            {
                name: "Biking",
                description: "Low-impact cardio. Cycle on machine or outdoors.",
            },
            {
                name: "Swimming",
                description: "Full-body cardio. Swim laps using various strokes.",
            },
            {
                name: "Jump Rope",
                description: "High-intensity cardio. Skip rope for intervals.",
            },
            {
                name: "Basketball",
                description: "Sport-based cardio. Play full or half court.",
            }
        ]
    };

    return (
        <div className="exercise-page">
            <div className="exercise-sidebar">
                <h3>Exercise Categories</h3>
                <ul>
                    <li onClick={() => handleCategoryClick('chest')}>Chest</li>
                    <li onClick={() => handleCategoryClick('back')}>Back</li>
                    <li onClick={() => handleCategoryClick('arms')}>Arms</li>
                    <li onClick={() => handleCategoryClick('shoulders')}>Shoulders</li>
                    <li onClick={() => handleCategoryClick('legs')}>Legs</li>
                    <li onClick={() => handleCategoryClick('abs')}>Abs</li>
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
