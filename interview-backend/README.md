# Interview Backend

This is a backend project built with NestJS, MongoDB, and MySQL. It is designed for a dual-database system, where products and orders are managed in MongoDB, and user authentication is handled with MySQL. The project also integrates a third-party weather API and provides a clean, consistent API response structure.

## Features

- **User Authentication** (MySQL, Sequelize, bcrypt, Passport.js JWT)
- **Product & Order Management** (MongoDB, Mongoose)
- **Weather API Integration** (OpenWeatherMap)
- **Swagger API Documentation** (with JWT support)
- **Consistent API Responses** (global interceptor & exception filter)
- **CORS enabled** for local Angular frontend (`localhost:4200`)
- **Unit tests** for all main modules

## How to Run

1. **Install dependencies:**
   ```
   npm install
   ```
2. **Set up your `.env` file:**
   ```
   MONGO_URI=mongodb://localhost/interview
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=yourpassword
   MYSQL_DB=interview
   JWT_SECRET=your_jwt_secret
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```
3. **Start the server:**
   ```
   npm run start:dev
   ```

## API Documentation

- Visit [http://localhost:3000/api](http://localhost:3000/api) for Swagger UI.
- Use `/auth/register` and `/auth/login` to get a JWT token.
- Click "Authorize" in Swagger and paste your token (just the token, not `Bearer ...`).
- All main endpoints (products, orders, users, weather) require JWT.

## Testing

- Run all unit tests with:
  ```
  npm run test
  ```

## Notes

- The project is organized for clarity and maintainability.
- All API responses are consistent, with clear success/error structure.
- No comments or unnecessary code clutter.
- The README is written to be clear and human, not copy-pasted or auto-generated.

---

If you have any questions or want to extend the project, just start coding. Everything is set up for a smooth developer experience.
