# GreenCart E-commerce Site

This is a full-stack e-commerce site built with:

- **React** (Frontend in `client/`)
- **Node.js / Express** (Backend in `server/`)
- **MongoDB** (Database)

## Folder Structure

- `client/` - React frontend
- `server/` - Express backend





GreenCart - MERN Stack E-commerce Project

A MERN Stack E-commerce project for sustainable grocery shopping.

Instructor Note: This project is ready to run locally. Cloudinary images are already configured, so no uploads are needed. The project is also hosted online for live preview.

1️⃣ Requirements

Node.js installed

npm installed

MongoDB (Atlas or local installation)

If you used Atlas, the connection URL is included in .env.

No need to create a new MongoDB account since the .env is included with a working database.

2️⃣ Setup Instructions:
Live Demo(Freehosting):   https://spontaneous-taffy-2a390e.netlify.app

Admin Credentials:

Email: chukwukarosemary2020@gmail.com

Password: 1234567
(The Admin Credentials enable the admin to add product and every other thing, also the OTP forgot password works only for the Admin email, that is because resend.com allows only one email for testing purposes if you don't have a working domain.

Steps to Run Locally:

Unzip GreenCart.zip.

Install dependencies:
(NOTE: You can open two terminals at once and run together by splitting the terminal)

cd GreenCart/server && npm install
cd ../client && npm install


Run backend:

cd ../server
npm run dev


If PowerShell blocks scripts:

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass


Run frontend:

cd ../client
npm run dev


Frontend: http://localhost:5173

Backend: http://localhost:8080

Notes

Database: Hosted on MongoDB Atlas (connection string already included in .env). No MongoDB or Compass installation is required.

OTP verification works for Admin email.

Cloudinary images are pre-configured; no uploads needed.

Key Features:

Full MERN stack: MongoDB, Express, React, Node.js

Admin panel with OTP verification

Product catalog, cart, checkout simulation

Responsive UI with Tailwind CSS

What I Learned:

MERN full-stack workflow

Cloudinary image hosting

JWT auth & OTP email verification

Responsive design & state management

Deploying on free hosting

Using MongoDB Atlas for cloud database hosting

Troubleshooting:

PowerShell errors when running npm run dev:
Run this once per terminal session:

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass


Port already in use (5173 or 8080):
Kill the process using the port and restart:

npx kill-port 5173( or just use :Ctrl c)
npx kill-port 8080  (Ctrl c)


If project still fails to run:

Delete node_modules and package-lock.json in both client and server.

Reinstall dependencies:

npm install


Run the servers again with npm run dev.

















