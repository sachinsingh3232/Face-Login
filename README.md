# Face-Login MERN APP

A MERN application using basic CRUD operations , authentication.

# Deployed link : https://codebugged-ai-front.vercel.app
# Backend URL : 
https://codebugged-ai-back.vercel.app

## Table of Contents

- [Features](#features)
- [Tools and Technologies](#tools-and-technologies)
- [Dependencies](#dependencies)
- [Dev-dependencies](#dev-dependencies)
- [Prerequisites](#prerequisites)
- [Installation and setup](#installation-and-setup)
- [Backend API](#backend-api)
- [frontend pages](#frontend-pages)
- [npm scripts](#npm-scripts)
- [Useful Links](#useful-links)

## Features

### User-side features

- Signup
- Login
- Logout
- Home Page for movie details

### Developer-side features

- Form validations in frontend and backend
- Use of 404 page for wrong data
- Relevant redirects
- Use of layout component for pages
- Use of various React hooks
- Routes protection
- Use of different HTTP status codes for sending responses
- Standard pratices followed

## Tools and Technologies

- HTML
- CSS
- Javascript
- Node.js
- Express.js
- React
- Mongodb

## Dependencies

Following are the major dependencies of the project:

- face-api.js
- react-webcam
- axios
- react
- react-dom
- react-router-dom
- dotenv
- cors
- dotenv
- express
- mongoose

## Dev-dependencies

Following are the major dev-dependencies of the project:

- nodemon

## Prerequisites

- Node.js must be installed on the system.
- You should have a MongoDB database.
- You should have a code editor (preferred: VS Code)

## Installation and Setup

1. Install all the dependencies in client and Backend

   ```sh
   npm install
   ```

2. Create a file named ".env" inside the Config folder of backend. Add following data to your .env file
3. PORT=9000
   CORS_URL=http://localhost:3000
   MONGODB_URL=YOUR_MONGO_URL
4. Start the application

   ```sh
   nodemon server.js in backend and npm start in client
   ```

5. Go to http://localhost:3000

## Backend API

<pre>
- POST     /api/user/register
- POST     /api/user/login
</pre>

## Frontend pages

<pre>
- /                 Home Screen (Public home page for movie details for logged-in users)
- /register           Signup page
- /login            Login page
</pre>

## npm scripts

Inside frontend folder:

-"start": "react-scripts start"
-"build": "react-scripts build"
-"test": "react-scripts test"
-"eject": "react-scripts eject"

## Useful Links

- This project

  - Github Repo: https://github.com/sachinsingh3232/Face-Login

- Official Docs

  - Reactjs docs: https://reactjs.org/docs/getting-started.html
  - npmjs docs: https://docs.npmjs.com/
  - Mongodb docs: https://docs.mongodb.com/manual/introduction/
  - Github docs: https://docs.github.com/en/get-started/quickstart/hello-world
