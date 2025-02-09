import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './styles/ExerciseDetail.css';

// Move exercises object outside the component
const exercises = {
    chest: [
        {
            name: "Bench Press",
            description: "Fundamental compound exercise for chest development. Lie on a flat bench and press the barbell up and down with controlled movement.",
            image: "/images/exercises/bench-press.jpg"
        },
        {
            name: "Incline Dumbbell Press",
            description: "Targets upper chest muscles. Perform on an incline bench with dumbbells for better range of motion.",
            image: "/images/exercises/incline-press.jpg"
        },
        {
            name: "Pec-Flys",
            description: "Isolation exercise for chest. Use cables or dumbbells to perform a flying motion that stretches and contracts chest muscles.",
            image: "/images/exercises/pec-flys.jpg"
        },
        {
            name: "Push-ups",
            description: "Bodyweight exercise that works chest, shoulders, and triceps. Great for building strength and endurance.",
            image: "/images/exercises/pushups.jpg"
        },
        {
            name: "Dips",
            description: "Compound exercise targeting lower chest, triceps, and shoulders. Perform on parallel bars.",
            image: "/images/exercises/dips.jpg"
        },
        {
            name: "Decline Bench",
            description: "Targets lower chest muscles. Perform on a decline bench for varied angle training.",
            image: "/images/exercises/decline-bench.jpg"
        }
    ],
    back: [
        {
            name: "Bent Over Rows",
            description: "Compound exercise for back thickness. Bend at hips and pull weight towards lower chest.",
            image: "/images/exercises/rows.jpg"
        },
        {
            name: "Lat Pulldowns",
            description: "Machine exercise targeting latissimus dorsi. Pull bar down to upper chest with wide grip.",
            image: "/images/exercises/pulldowns.jpg"
        },
        {
            name: "Pull-Ups",
            description: "Bodyweight exercise for back width. Grip bar overhead and pull yourself up.",
            image: "/images/exercises/pullups.jpg"
        },
        {
            name: "Lat Pullovers",
            description: "Isolation exercise for lats. Lie on bench and pull weight in arc motion over head.",
            image: "/images/exercises/pullovers.jpg"
        }
    ],
    arms: [
        {
            name: "Bicep Curls",
            description: "Classic bicep exercise. Curl weight up with palms facing up for bicep peak.",
            image: "/images/exercises/bicep-curls.jpg"
        },
        {
            name: "Hammer Curls",
            description: "Targets outer bicep and forearms. Curl with palms facing each other.",
            image: "/images/exercises/hammer-curls.jpg"
        },
        {
            name: "Tricep Push Downs",
            description: "Cable exercise for triceps. Push bar down with elbows at sides.",
            image: "/images/exercises/pushdowns.jpg"
        },
        {
            name: "Skull Crushers",
            description: "Lying tricep extension. Lower weight to forehead and extend arms.",
            image: "/images/exercises/skull-crushers.jpg"
        }
    ],
    shoulders: [
        {
            name: "Shoulder Press",
            description: "Compound movement for deltoids. Press weight overhead from shoulder level.",
            image: "/images/exercises/shoulder-press.jpg"
        },
        {
            name: "Rear Delt Flys",
            description: "Targets posterior deltoids. Bend forward and raise weights out to sides.",
            image: "/images/exercises/rear-delt.jpg"
        },
        {
            name: "Lateral Raises",
            description: "Isolation for middle deltoids. Raise weights to sides to shoulder level.",
            image: "/images/exercises/lateral-raises.jpg"
        },
        {
            name: "Face Pulls",
            description: "Targets rear deltoids and upper back. Pull rope to face level.",
            image: "/images/exercises/face-pulls.jpg"
        }
    ],
    legs: [
        {
            name: "Squats",
            description: "King of leg exercises. Bend knees and hips to lower body, then stand.",
            image: "/images/exercises/squats.jpg"
        },
        {
            name: "Leg Press",
            description: "Machine compound movement. Press weight away with legs while seated.",
            image: "/images/exercises/leg-press.jpg"
        },
        {
            name: "Hamstring Curls",
            description: "Isolation for hamstrings. Curl weight with legs while lying down.",
            image: "/images/exercises/ham-curls.jpg"
        },
        {
            name: "Calf Raises",
            description: "Targets calves. Rise up on toes with weight on shoulders.",
            image: "/images/exercises/calf-raises.jpg"
        },
        {
            name: "Leg Extensions",
            description: "Isolation for quadriceps. Extend legs from seated position.",
            image: "/images/exercises/leg-ext.jpg"
        }
    ],
    abs: [
        {
            name: "Crunches",
            description: "Basic ab exercise. Curl upper body towards knees while lying down.",
            image: "/images/exercises/crunches.jpg"
        },
        {
            name: "Planks",
            description: "Core stability exercise. Hold position with straight body.",
            image: "/images/exercises/planks.jpg"
        }
    ],
    cardio: [
        {
            name: "Running",
            description: "Basic cardio exercise. Run at steady pace or intervals.",
            image: "/images/exercises/running.jpg"
        },
        {
            name: "Biking",
            description: "Low-impact cardio. Cycle on machine or outdoors.",
            image: "/images/exercises/biking.jpg"
        },
        {
            name: "Swimming",
            description: "Full-body cardio. Swim laps using various strokes.",
            image: "/images/exercises/swimming.jpg"
        },
        {
            name: "Jump Rope",
            description: "High-intensity cardio. Skip rope for intervals.",
            image: "/images/exercises/jump-rope.jpg"
        },
        {
            name: "Basketball",
            description: "Sport-based cardio. Play full or half court.",
            image: "/images/exercises/basketball.jpg"
        }
    ]
};

function ExerciseDetail() {
    const { category } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Add useEffect to handle route changes
    useEffect(() => {
        console.log('Route changed:', category);
        // Force re-render when the route changes
        if (category && !exercises[category]) {
            navigate('/exercise/chest'); // Redirect to default if invalid category
        }
    }, [category, location.pathname, navigate]);

    const handleCategoryClick = (selectedCategory) => {
        // Update the navigation path to match your app's route structure
        navigate(`/Home/exercise/${selectedCategory}`);  // Add /Home prefix if that's your base route
    };

    // Safely access category exercises
    const categoryExercises = category ? exercises[category] || [] : [];
    const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

    return (
        <div className="exercise-page">
            <div className="exercise-sidebar">
                <h3>Exercise Categories</h3>
                <ul>
                    <li 
                        onClick={() => handleCategoryClick('chest')}
                        className={category === 'chest' ? 'active' : ''}
                    >
                        Chest
                    </li>
                    <li 
                        onClick={() => handleCategoryClick('back')}
                        className={category === 'back' ? 'active' : ''}
                    >
                        Back
                    </li>
                    <li 
                        onClick={() => handleCategoryClick('arms')}
                        className={category === 'arms' ? 'active' : ''}
                    >
                        Arms
                    </li>
                    <li 
                        onClick={() => handleCategoryClick('shoulders')}
                        className={category === 'shoulders' ? 'active' : ''}
                    >
                        Shoulders
                    </li>
                    <li 
                        onClick={() => handleCategoryClick('legs')}
                        className={category === 'legs' ? 'active' : ''}
                    >
                        Legs
                    </li>
                    <li 
                        onClick={() => handleCategoryClick('abs')}
                        className={category === 'abs' ? 'active' : ''}
                    >
                        Abs
                    </li>
                    <li 
                        onClick={() => handleCategoryClick('cardio')}
                        className={category === 'cardio' ? 'active' : ''}
                    >
                        Cardio
                    </li>
                </ul>
            </div>

            <div className="exercise-content">
                {categoryTitle && <h2>{categoryTitle} Exercises</h2>}
                <div className="exercise-grid">
                    {categoryExercises.map((exercise, index) => (
                        <div key={index} className="exercise-card">
                            <h3>{exercise.name}</h3>
                            <p>{exercise.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ExerciseDetail;
