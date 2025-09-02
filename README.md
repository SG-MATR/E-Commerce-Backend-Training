📦 Backend Project

This is a backend project built with Node.js and Express.js, using PostgreSQL as the database and Prisma as the ORM.
The project is connected to a managed PostgreSQL instance hosted on Aiven, and DBeaver was used for database management.
API testing and debugging were performed with Postman.

🛠️ Tech Stack

Node.js – Runtime environment for building the server

Express.js – Web framework for handling routes and APIs

Prisma – Modern ORM for database access and migrations

PostgreSQL – Relational database

Aiven – Cloud-hosted PostgreSQL provider

DBeaver – Database visualization and management tool

Postman – API testing tool

📂 Project Structure
.
├── controllers/       # Express route controllers
├── prisma/            # Prisma schema and migrations
├── routes/            # API route definitions
├── node_modules/      # Dependencies
├── .env               # Environment variables (database connection, etc.)
├── package.json       # Project dependencies and scripts
├── index.js          # Entry point
└── README.md          # Project documentation

⚙️ Setup & Installation

Clone the repository

git clone https://github.com/SG-MATR/E-Commerce-Backend-Training.git
cd your-backend-project


Install dependencies

npm install


Set up environment variables
Create a .env file in the project root:

DATABASE_URL="postgresql://user:password@host:port/database"


Run Prisma migrations

npx prisma migrate dev


Start the server

npm run dev


The server should now be running at http://localhost:5000

🧪 Testing the API

Use Postman to test available endpoints.

Example:

GET /products → fetch all products

POST /categories → create a new category

📊 Database Management

DBeaver can be used to visualize and manage PostgreSQL tables.

Prisma Studio is also available for a web-based database UI:

npx prisma studio

🚀 Deployment

The project uses Aiven PostgreSQL for cloud hosting.

Deployment steps will vary depending on where you host your Node.js backend (e.g., Render, Railway, Heroku, or Docker).

📌 Notes

Ensure your .env file is never committed to GitHub (already in .gitignore).

Prisma automatically keeps updatedAt fields in sync when defined with @updatedAt.

Foreign key constraints are enforced by PostgreSQL (e.g., categories with products cannot be deleted unless handled).
