import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

const initialState = {
    user: null,
    profile: null,
    nutrition: {
        dailyGoals: {
            calories: 2000,
            protein: 150,
            water: 3.0
        },
        meals: [],
        foodLog: {}
    },
    exercise: {
        workouts: [],
        completedSets: {},
        routines: {
            chest: {
                name: 'Chest and Triceps',
                exercises: [
                    { name: 'Bench Press', sets: 3, reps: 10, completed: 0 },
                    { name: 'Incline Press', sets: 3, reps: 10, completed: 0 },
                    { name: 'Tricep Extensions', sets: 3, reps: 12, completed: 0 }
                ]
            },
            // Add more workout routines here
        }
    }
}

function appReducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
        case 'SET_PROFILE':
            return { ...state, profile: action.payload }
        case 'LOG_FOOD':
            return {
                ...state,
                nutrition: {
                    ...state.nutrition,
                    foodLog: {
                        ...state.nutrition.foodLog,
                        [action.payload.date]: [
                            ...(state.nutrition.foodLog[action.payload.date] || []),
                            action.payload.food
                        ]
                    }
                }
            }
        case 'COMPLETE_EXERCISE_SET':
            return {
                ...state,
                exercise: {
                    ...state.exercise,
                    completedSets: {
                        ...state.exercise.completedSets,
                        [action.payload.exerciseId]: (state.exercise.completedSets[action.payload.exerciseId] || 0) + 1
                    }
                }
            }
        default:
            return state
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}