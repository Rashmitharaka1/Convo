import express from 'express';
import "dotenv/config.js";
import cors from 'cors';
import http from 'http';
import connectDB from './lib/db.js';

//create Express app and HTTP server
const app = express();
const server = http.createServer(app);

//middleware
app.use(cors());
app.use(express.json({limit: '10mb'}));

app.use("/api/status", (req, res)=> res.send("server is live"));

//connect to mongoDB

await connectDB();


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => 
    console.log("server is running port: " + PORT));
