# NC State Data Product Management Web Application

## Overview

This project is a comprehensive Health Application developed as part of a hackathon at NC State University. The application is designed to support the health and wellness of NC State students. It allows users to track their daily calories and macronutrients consumed, monitor their water intake in cups, log the exercises they perform, and manage their personal settings such as passwords and profile information. Additionally, students can receive notifications about NC State events, including 5K runs and other activities related to the university's future plans.

## Features

- **User Authentication:** Secure login and registration with global credential management.
- **Exercise Module:** Track and detail exercises with a sidebar navigation and scrollable exercise panel.
- **Nutrition Module:** Monitor and manage dietary habits.
- **Profile & Settings:** Personalize user information and application settings.

## Future Features

- **NC State Notifications:** Receive updates on NC State events, such as 5K runs and other future plans.
- **Connect to NC State Dining Hall Database:** Track your calories and nutrients easier with NC State Dining Foods.

## Technologies Used

- **Frontend:** React with Vite
- **Backend:** Django
- **Database:** MongoDB
- **Python Libraries:** mongoengine

## Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/DavidMond9/NCSUHealth.git
   ```
2. Navigate to the project directory:
   ```shell
   cd NCSUHealth
   ```
3. Install frontend dependencies:
   ```shell
   cd frontend
   npm install
   ```
4. Set up the backend:
   ```shell
   cd ../backend
   pip install -r requirements.txt
   python manage.py migrate
   ```
5. Run the development servers:
   - Frontend:
     ```shell
     npm run dev
     ```
   - Backend:
     ```shell
     python manage.py runserver
     ```

## Usage

- Access the app via `http://localhost:####`.
- Register or log in to explore features.
- Navigate between Exercise, Nutrition, Profile, and Settings pages.
- Receive notifications for NC State events in the notifications panel.

## Contributors

- James Kocak
- Jacob Kocak
- Mukul Sauhta
- David Mond

## Contact

For inquiries, please contact jamkocak88@gmail.com.

