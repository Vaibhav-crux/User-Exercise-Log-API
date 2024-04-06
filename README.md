# User Exercise Log API

This project is a simple API for managing user exercise logs. It allows users to create accounts, log exercises, and view their exercise logs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine.
- A code editor like Visual Studio Code.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/user-exercise-log-api.git
   ```
2. Navigate to the project directory:
   ```
   cd user-exercise-log-api
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```
   PORT=3000
   ```

## Usage

To start the server, run:
```
npm start
```

The server will start on the port specified in the `.env` file.

## API Endpoints

### POST /api/users

Creates a new user.

**Request Body**:
- `username`: The username of the user.

**Response**:
- The created user object.

### GET /api/users

Retrieves all users.

**Response**:
- An array of user objects.

### POST /api/users/:_id/exercises

Adds an exercise to a user's log.

**Request Body**:
- `description`: The description of the exercise.
- `duration`: The duration of the exercise in minutes.
- `date`: The date of the exercise (optional, defaults to the current date).

**Response**:
- The updated user object with the new exercise.

### GET /api/users/:_id/logs

Retrieves a user's exercise logs.

**Query Parameters**:
- `from`: The start date of the logs (optional).
- `to`: The end date of the logs (optional).
- `limit`: The maximum number of logs to return (optional).
