import express from 'express';
import "dotenv/config.js";
import cors from 'cors';
import http from 'http';
import connectDB from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRouter.js';

//create Express app and HTTP server
const app = express();
const server = http.createServer(app);

//middleware
app.use(cors());
app.use(express.json({limit: '10mb'}));


// Routes setup
app.use("/api/status", (req, res)=> res.send("server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

//connect to mongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => 
    console.log("server is running port: " + PORT));
