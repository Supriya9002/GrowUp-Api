import express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import studentRouter from './routes/student.route.js';
import teacherRouter from './routes/teacher.route.js';
import classRouter from './routes/class.route.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';

dotenv.config()

const connectToDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGO, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // serverSelectionTimeoutMS: 5000, // Increase the timeout setting
        // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('Failed to connect to MongoDB', error);
    }
  };
  
  connectToDatabase();



const __dirname = path.resolve();

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}!`);
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/student",studentRouter);
app.use("/api/teacher",teacherRouter);
app.use("/api/class",classRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  })

app.get("/", (req, res)=>{
    res.send("WELCOME to GrowUp App");
})


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
