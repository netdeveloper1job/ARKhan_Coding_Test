# Interview App Monorepo

This monorepo contains both the **Frontend** and **Backend** of a modern web application designed for interviews, assessments, and scalable feature-rich development. It uses Angular 19 for the frontend and NestJS for the backend, with a clean, modular structure and dual database integration.

---

## Project Structure

.
├── frontend/   → Angular 19 app (SSR, Auth, Product Management)
└── backend/    → NestJS app (Auth, Products/Orders, Weather API)

---

## Technologies Used

Frontend:
- Angular 19
- NgRx for state management
- Bootstrap & Font Awesome
- SCSS
- ngx-toastr for notifications
- Angular SSR for server-side rendering

Backend:
- NestJS
- MongoDB (for products and orders)
- MySQL (for user authentication)
- Sequelize ORM & Mongoose ODM
- Passport.js (JWT strategy)
- OpenWeatherMap API integration
- Swagger for API documentation
- Global response interceptors and exception filters

---

## Getting Started

### Prerequisites
- Node.js and npm
- Angular CLI (for frontend)
- MongoDB and MySQL running locally

---

## Frontend Setup (Angular 19)

1. Navigate to the frontend directory:

cd frontend

2. Install dependencies:

npm install

3. Run the development server:

ng serve

4. Open in browser:

http://localhost:4200/

To build the project for production:

ng build

To run unit tests:

ng test

---

## Backend Setup (NestJS)

1. Navigate to the backend directory:

cd backend

2. Install dependencies:

npm install

3. Create a `.env` file and configure it:

MONGO_URI=mongodb://localhost/interview  
MYSQL_HOST=localhost  
MYSQL_PORT=3306  
MYSQL_USER=root  
MYSQL_PASSWORD=yourpassword  
MYSQL_DB=interview  
JWT_SECRET=your_jwt_secret  
OPENWEATHER_API_KEY=your_openweather_api_key

4. Start the development server:

npm run start:dev

---

## API Documentation (Swagger)

Visit:

http://localhost:3000/api

To authorize:
- First register/login via `/auth/register` or `/auth/login`
- Copy the JWT token and click "Authorize" in Swagger UI
- Paste only the token (not the word "Bearer")

---

## Testing

To run backend unit tests:

npm run test

---

## Notes

- CORS is enabled for `localhost:4200` (frontend)
- All responses follow a consistent success/error structure
- The codebase is clean and free of unnecessary clutter
- The project is ready for extension and production-level features

---

Happy coding! 🚀
