import React, { useState } from 'react'
import { useApp } from './AppContext'
import './styles/Nutrition.css'

function Nutrition() {
    const { state, dispatch } = useApp()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMeal, setSelectedMeal] = useState('breakfast')

    // Mock food database - in real app, this would be an API call
    const searchFood = (term) => {
        const mockFoodDb = [
            { id: 1, name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
            { id: 2, name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
            // Add more foods
        ]
        return mockFoodDb.filter(food =>
            food.name.toLowerCase().includes(term.toLowerCase())
        )
    }

    const handleAddFood = (food) => {
        dispatch({
            type: 'LOG_FOOD',
            payload: {
                date: new Date().toISOString().split('T')[0],
                food: {
                    ...food,
                    meal: selectedMeal,
                    timestamp: new Date().toISOString()
                }
            }
        })
    }

    const searchResults = searchTerm ? searchFood(searchTerm) : []

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

                {searchTerm && (
                    <div className="search-results">
                        {searchResults.map(food => (
                            <div key={food.id} className="food-item">
                                <div className="food-info">
                                    <h3>{food.name}</h3>
                                    <p>{food.calories} kcal | {food.protein}g protein</p>
                                </div>
                                <button onClick={() => handleAddFood(food)}>Add</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="daily-summary">
                <h2>Today's Log</h2>
                {/* Display logged foods for today */}
                {state.nutrition.foodLog[new Date().toISOString().split('T')[0]]?.map((food, index) => (
                    <div key={index} className="logged-food">
                        <span>{food.name}</span>
                        <span>{food.calories} kcal</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Nutrition;