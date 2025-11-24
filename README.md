# Convo – Real-Time Chat Application (MERN + Socket.io)  
<p align="center">
<img src="client/src/assets/logo1.png" alt="convo" width="500">
</p>

---

## 📖 Overview  
Convo is a full-stack real-time chat application built using the MERN stack and Socket.io. It supports instant messaging, online user presence, chat rooms, and a clean, responsive UI. This entire project is created for educational purposes to understand real-time communication and full-stack development. 

---

## 🚀 Features  

### 💬 Real-Time Messaging
- Instant message sending & receiving  
- Real-time socket communication
- Online/offline user status 

### 👥 Chat Room System  
- Create chat rooms  
- Join/leave rooms
- Private & group chat
- Message history stored in MongoDB 

### 🔐 Authentication 
- User Login & Registration 
- JWT-based Authentication
- Protected API routes

### 🎨 Frontend UI 
- React + Hooks  
- Responsive modern UI
- Real-time updates without refresh

---

## 🛠️ Tech Stack  
- **Frontend:** React, Axios, Redux
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB + Mongoose
- **Real-time Communication:** Socket.io

---

## 📂 Project Structure

```bash
Convo/
│
├── Client/
│   ├── context/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env               
│   ├── .gitignore          
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── server/
│   ├── controllers/
│   ├── lib/
│   ├── middleware/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── utils/
│   ├── .env              
│   ├── package.json
│   ├── package-lock.json
│   └── server.js

```

---

## ⚙️ Installation & Setup 

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Rashmitharaka1/Convo.git
cd your-repo-name
```

### 🔧 Backend Setup
```bash
cd server
npm install
```
Create a .env file in the server folder:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
```
Start the backend:
```bash
npm run dev
```

### 🖥 Frontend Setup
```bash
cd client
npm install
npm start
```
Your application will run on:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### 🔌 Socket.io Events
| **Event**         | **Description**         |
| ----------------- | ----------------------- |
| `connection`      | User connects to socket |
| `send-message`    | Send a message          |
| `receive-message` | Receive message live    |
| `typing`          | Typing indicator        |
| `join-room`       | Join chat room          |
| `disconnect`      | User disconnects        |


---
### 🤝 Contributions
- Pull requests are welcome
- Fork → Improve → Submit

---
### 📜 License
This project is designed only for education and learning.

Developed by Rashmi Tharaka

📧 Contact: rashmitharaka509@gmail.com
