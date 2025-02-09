import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useApp } from './AppContext';

// Import the logo if it's inside the src folder. Adjust the path as necessary.
import logo from './assets/NCSUHealth.png';

function Home() {
    const { state } = useApp();
    // Assume that if state.profile is null/undefined, the profile is incomplete.
    const profileComplete = !!state.profile;

    // Handler to prevent navigation on disabled links
    const handleDisabledClick = (e) => {
        if (!profileComplete) {
            e.preventDefault();
        }
    };

    return (
        <div className="home-container">
            {/* Logo fixed in the top left corner */}
            <div
                className="logo-container"
                style={{
                    position: 'fixed',
                    top: '10px',
                    left: '10px',
                    zIndex: 1000 // Ensures the logo appears above other content
                }}
            >
                <Link to="profile" className="logo-container">
                <img
                    src={logo}
                    alt="NCSU Health Logo"
                    style={{ width: '50px', height: 'auto' }}
                    className="logo"
                />
            </Link>
            </div>

            {/* Outlet for nested routes */}
            <Outlet />

            {/* Bottom Navigation */}
            <nav className="bottom-nav">
                {/* Profile tab is always enabled */}
                <Link to="profile">Profile</Link>


                {/* The other links have the same styling as Link but are conditionally disabled */}
                <Link
                    to="nutrition"
                    className={profileComplete ? '' : 'disabled-link'}
                    onClick={handleDisabledClick}
                >
                    Nutrition
                </Link>
                <Link
                    to="exercise"
                    className={profileComplete ? '' : 'disabled-link'}
                    onClick={handleDisabledClick}
                >
                    Exercise
                </Link>
                <Link
                    to="settings"
                    className={profileComplete ? '' : 'disabled-link'}
                    onClick={handleDisabledClick}
                >
                    Settings
                </Link>
            </nav>
        </div>
    );
}

export default Home;

// import React from 'react';
// import { Outlet, Link } from 'react-router-dom';
// import { useApp } from './AppContext';

// // Import the logo if it's inside the src folder. Adjust the path as necessary.
// import logo from './assets/NCSUHealth.png';

// function Home() {
//     const { state } = useApp();
//     // Assume that if state.profile is null/undefined, the profile is incomplete.
//     const profileComplete = !!state.profile;

//     // Handler to prevent navigation on disabled links
//     const handleDisabledClick = (e) => {
//         if (!profileComplete) {
//             e.preventDefault();
//         }
//     };

//     return (
//         <div className="home-container">
//             {/* Clickable Logo - Redirects to Profile */}
//             <Link to="profile" className="logo-container">
//                 <img
//                     src={logo}
//                     alt="NCSU Health Logo"
//                     className="logo"
//                 />
//             </Link>

//             {/* Outlet for nested routes */}
//             <Outlet />

//             {/* Bottom Navigation */}
//             <nav className="bottom-nav">
//                 {/* Profile tab is always enabled */}
//                 <Link to="profile">Profile</Link>

//                 {/* The other links are conditionally disabled */}
//                 <Link
//                     to="nutrition"
//                     className={profileComplete ? '' : 'disabled-link'}
//                     onClick={handleDisabledClick}
//                 >
//                     Nutrition
//                 </Link>
//                 <Link
//                     to="exercise"
//                     className={profileComplete ? '' : 'disabled-link'}
//                     onClick={handleDisabledClick}
//                 >
//                     Exercise
//                 </Link>
//                 <Link
//                     to="settings"
//                     className={profileComplete ? '' : 'disabled-link'}
//                     onClick={handleDisabledClick}
//                 >
//                     Settings
//                 </Link>
//             </nav>
//         </div>
//     );
// }

// export default Home;
