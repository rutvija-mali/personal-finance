import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"; 
import  connectDB from './config/connectDB.js';
import errorLogger from './middlewares/errorLogger.js';
import requestLogger from './middlewares/requestLogger.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT ||5000;
const allowedOrigins = ['http://localhost:5173','http://localhost:5174']

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: (origin, callback)=>{
    if(allowedOrigins.includes(origin)){
      callback(null, true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods:['POST', 'PUT', 'PATCH', 'GET', 'DELETE'],
  allowedHeaders:['Content-Type', 'Authorization'],
  credentials:true
}))


app.use(requestLogger)
app.use('/auth',authRoutes)
app.use(errorLogger)

//routes

//connect to mongoDB
connectDB();

//server listening
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})