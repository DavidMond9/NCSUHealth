// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Import style
// import './styles/App.css';

// // Import your page components
// import Home from './Home';
// import Auth from './Auth';
// import Profile from './Profile';
// import Nutrition from './Nutrition';
// import Exercise from './Exercise';
// import ExerciseDetail from './ExerciseDetail';
// import Settings from './Settings';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Authentication page */}
//         <Route path="/Auth" element={<Auth />} />

//         {/* Home page with nested routes */}
//         <Route path="/Home" element={<Home />} >
//           {/* Default route is profile */}
//           <Route path="/Home" element={<Profile />} />

//           <Route path="profile" element={<Profile />} />
//           <Route path="nutrition" element={<Nutrition />} />
//           <Route path="exercise" element={<Exercise />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>

//         {/* Exercise detail page */}
//         <Route path="exercise/:category" element={<ExerciseDetail />} />

//         {/* Default route */}
//         <Route path="/" element={<Auth />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import styles
import './styles/App.css';

// Import your page components
import Home from './Home';
import Auth from './Auth';
import Profile from './Profile';
import Nutrition from './Nutrition';
import Exercise from './Exercise';
import ExerciseDetail from './ExerciseDetail';
import Settings from './Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication page */}
        <Route path="/Auth" element={<Auth />} />

        {/* Home page with nested routes */}
        <Route path="/Home" element={<Home />}>
          {/* Default route (redirect to profile if user navigates to /Home) */}
          <Route index element={<Navigate to="profile" />} />

          {/* Nested routes under Home */}
          <Route path="profile" element={<Profile />} />
          <Route path="nutrition" element={<Nutrition />} />
          <Route path="exercise" element={<Exercise />} />
          <Route path="exercise/:category" element={<ExerciseDetail />} /> {/* Moved here */}
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/Auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
