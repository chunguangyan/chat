Real-Time Chat Application

Introduction

This is a real-time chat application built using Angular for the frontend and Node.js with Express for the backend, with MongoDB as the database. The app supports features like user registration, group management, channel-based messaging, real-time communication using Socket.io, and file uploads (e.g., profile images, chat attachments).

Features

User registration and login with JWT authentication.
Group and channel management.
Real-time messaging using Socket.io.
Profile image upload and management.
File upload functionality (images, videos).
Responsive Angular frontend.
Secure REST API with Node.js and MongoDB for data storage.
Technologies Used

Frontend: Angular, TypeScript, HTML, CSS
Backend: Node.js, Express.js
Database: MongoDB
Real-Time Communication: Socket.io
File Upload: Multer
Authentication: JWT (JSON Web Token)
Installation and Setup

Backend Setup
Clone the repository:
bash
Copy code
git clone https://github.com/your-repo-name.git
Navigate to the backend directory:
bash
Copy code
cd chat-backend
Install backend dependencies:
bash
Copy code
npm install
Create a .env file to store environment variables (e.g., MongoDB URI, JWT secret):
bash
Copy code
touch .env
Example content:

env
Copy code
MONGODB_URI=mongodb://localhost:27017/chat
JWT_SECRET=your_secret_key
Start the backend server:
bash
Copy code
npm start
Frontend Setup
Navigate to the frontend directory:
bash
Copy code
cd chat-frontend
Install frontend dependencies:
bash
Copy code
npm install
Start the frontend development server:
bash
Copy code
ng serve
Open a browser and navigate to http://localhost:4200 to access the application.
