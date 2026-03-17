# Webapp (Frontend)

This project is the **frontend** part of a full-stack application and was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.4.

The backend for this project is located in a separate **`backend/`** folder and provides REST APIs with JWT-based authentication.

---

## Project Structure

```text
root/
│── webapp/        # Angular frontend
│── backend/       # Node.js + Express backend
```

---

## Frontend – Webapp (Angular)

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to:

```text
http://localhost:4200/
```

The application will automatically reload whenever you modify any of the source files.

---

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

---

### Building

To build the frontend project, run:

```bash
ng build
```

This will compile the application and store the build artifacts in the `dist/` directory. By default, the production build optimizes the application for performance and speed.

---

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner:

```bash
ng test
```

---

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not include an end-to-end testing framework by default.

---

## Backend (API Server)

The backend is responsible for business logic, authentication, and database operations.

### Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose ODM)
* JSON Web Tokens (JWT) for authentication
* dotenv for environment configuration

---

### Backend setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

### Environment variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

---

### Run backend server

```bash
npm run dev
```

or

```bash
node src/server.js
```

The backend API will be available at:

```text
http://localhost:5000/
```

---

## Authentication (JWT)

The application uses **JSON Web Tokens (JWT)** for secure authentication.

### Flow

1. User logs in or registers
2. Backend validates credentials
3. JWT token is generated and returned
4. Token is sent in the `Authorization` header for protected routes

```http
Authorization: Bearer <jwt_token>
```

---

## API Communication

The Angular frontend communicates with the backend using REST APIs.

**Base URL (development):**

```text
http://localhost:5000/api
```

All HTTP calls are handled using Angular services.

---

## Additional Resources

* [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
* Express.js Documentation
* MongoDB Documentation
* JWT Documentation
