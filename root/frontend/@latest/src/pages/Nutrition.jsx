import React, { useState, useEffect } from 'react'
import { useApp } from './AppContext'
import './styles/Nutrition.css'

function Nutrition() {
    const { state, dispatch } = useApp()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMeal, setSelectedMeal] = useState('breakfast')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // Replace this with your actual API key
    const API_KEY = 'cMLtYjfAUevIAxeOV25RxcngIU3jNTu3E17abrNg'
    const BASE_URL = 'https://api.nal.usda.gov/fdc/v1'

    const searchFood = async (term) => {
        if (!term) {
            setSearchResults([])
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(
                `${BASE_URL}/foods/search?api_key=${API_KEY}&query=${encodeURIComponent(term)}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            const data = await response.json()
            setSearchResults(data.foods || [])
        } catch (error) {
            console.error('Error searching foods:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Debounce the search to avoid too many API calls
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm) {
                searchFood(searchTerm)
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchTerm])

    // Calculate total calories for today
    const getTotalCalories = () => {
        const todaysFoods = state.nutrition.foodLog[new Date().toISOString().split('T')[0]] || [];
        return todaysFoods.reduce((total, food) => total + food.calories, 0);
    };

    // Calculate nutrition totals for today
    const calculateNutritionTotals = () => {
        const todaysFoods = state.nutrition.foodLog[new Date().toISOString().split('T')[0]] || [];
        return todaysFoods.reduce((totals, food) => ({
            calories: totals.calories + (food.calories || 0),
            protein: totals.protein + (food.protein || 0),
            water: totals.water + (food.water || 0)
        }), { calories: 0, protein: 0, water: 0 });
    };

    const handleAddFood = (food) => {
        // Find protein nutrient from the API response
        const proteinNutrient = food.foodNutrients.find(
            n => n.nutrientName === 'Protein' || 
                 n.nutrientId === 1003 || // USDA nutrient ID for protein
                 n.name === 'Protein'
        );

        const foodItem = {
            id: food.fdcId,
            name: food.description,
            calories: food.foodNutrients.find(
                n => n.nutrientName === 'Energy' || 
                     n.nutrientId === 1008 || // USDA nutrient ID for calories
                     n.name === 'Energy'
            )?.value || 0,
            protein: proteinNutrient?.value || 0,
            carbs: food.foodNutrients.find(
                n => n.nutrientName === 'Carbohydrate, by difference' || 
                     n.nutrientId === 1005 || // USDA nutrient ID for carbs
                     n.name === 'Carbohydrates'
            )?.value || 0,
            fat: food.foodNutrients.find(
                n => n.nutrientName === 'Total lipid (fat)' || 
                     n.nutrientId === 1004 || // USDA nutrient ID for fat
                     n.name === 'Fat'
            )?.value || 0,
            meal: selectedMeal,
            timestamp: new Date().toISOString()
        };

        dispatch({
            type: 'LOG_FOOD',
            payload: {
                date: new Date().toISOString().split('T')[0],
                food: foodItem
            }
        });

        // Update user's daily calories and protein in profile
        if (state.profile) {
            const newTotals = calculateNutritionTotals();
            dispatch({
                type: 'UPDATE_NUTRITION_TOTALS',
                payload: {
                    calories: newTotals.calories,
                    protein: newTotals.protein
                }
            });
        }
    };

    const handleRemoveFood = (index) => {
        const today = new Date().toISOString().split('T')[0];
        const currentLog = [...(state.nutrition.foodLog[today] || [])];
        const removedFood = currentLog[index];
        
        currentLog.splice(index, 1);
        
        dispatch({
            type: 'UPDATE_FOOD_LOG',
            payload: {
                date: today,
                foods: currentLog
            }
        });

        // Update user's daily calories
        if (state.profile && removedFood) {
            const newTotalCalories = getTotalCalories() - removedFood.calories;
            dispatch({
                type: 'UPDATE_DAILY_CALORIES',
                payload: newTotalCalories
            });
        }
    };

    const handleAddWater = () => {
        const today = new Date().toISOString().split('T')[0];
        const waterItem = {
            id: `water-${Date.now()}`,
            name: 'Water',
            calories: 0,
            protein: 0,
            water: 1, // 1 cup of water
            meal: 'water',
            timestamp: new Date().toISOString()
        };

        dispatch({
            type: 'LOG_FOOD',
            payload: {
                date: today,
                food: waterItem
            }
        });

        // Update water intake in profile
        const newTotals = calculateNutritionTotals();
        dispatch({
            type: 'UPDATE_WATER_INTAKE',
            payload: newTotals.water + 1
        });
    };

    return (
        <div className="nutrition-page">
            <h1>Nutrition Tracker</h1>

            <div className="meal-selector">
                <select
                    value={selectedMeal}
                    onChange={(e) => setSelectedMeal(e.target.value)}
                >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snacks">Snacks</option>
                </select>
            </div>

            <div className="food-search">
                <input
                    type="text"
                    placeholder="Search for food..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {isLoading && <div className="loading">Searching...</div>}

                {searchTerm && !isLoading && (
                    <div className="search-results">
                        {searchResults.map(food => (
                            <div key={food.fdcId} className="food-item">
                                <div className="food-info">
                                    <h3>{food.description}</h3>
                                    <p>
                                        {food.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0} kcal | 
                                        {food.foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0}g protein
                                    </p>
                                </div>
                                <button onClick={() => handleAddFood(food)}>Add</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="daily-summary">
                <div className="water-tracking">
                    <h3>Water Tracking</h3>
                    <button 
                        className="water-button"
                        onClick={handleAddWater}
                    >
                        + 1 Cup
                    </button>
                </div>

                <h2>Today's Log</h2>
                <div className="logged-foods-container">
                    {state.nutrition.foodLog[new Date().toISOString().split('T')[0]]?.map((food, index) => (
                        <div key={index} className="logged-food">
                            <div className="logged-food-info">
                                <span className="food-number">{index + 1}.</span>
                                <span className="food-name">{food.name}</span>
                            </div>
                            <div className="logged-food-actions">
                                <span className="food-calories">{food.calories} kcal</span>
                                <button 
                                    className="remove-food-btn"
                                    onClick={() => handleRemoveFood(index)}
                                    aria-label="Remove food item"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Add progress bars */}
                <div className="nutrition-progress">
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
                
                <div className="total-calories">
                    Total: {getTotalCalories()} kcal
                </div>
            </div>
        </div>
    )
}

export default Nutrition;