# Todo App

A simple CRUD app that incorporates JWT-based authentication. Users can register, log in, and manage their tasks. 

## Features

- **JWT Authentication**: Secure user authentication with JSON Web Tokens.
- **Task Management**: Create, edit, and delete tasks.

## Technologies Used

- **Frontend**:
  - React.js
  - Bootstrap
  - Axios
  
- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL
  - JWT Authentication

## Installation

Follow these steps to get the project up and running on your local machine.

### Clone the Repository

```bash
git clone https://github.com/brandon0719/auth-todo-app.git
cd auth-todo-app
```

### Install Dependencies

Navigate to the root directory of the project and install the required dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
JWT_SECRET=your_jwt_secret_key
DATABASE_PW=your_database_password
```

### Run the Application

Start the backend server:

```bash
npm run dev
```

Start the frontend development server:

```bash
npm start
```

The application should now be running at `http://localhost:3000`.

## Usage

- **Registration**: New users can register by providing a username, email, and password.
- **Login**: Registered users can log in using their email and password.
- **Task Management**: After logging in, users can create, view, edit, and delete tasks.

## Demo
