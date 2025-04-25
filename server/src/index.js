import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from "morgan";
import connectToDB from './config/connectToDB.js'
import authRouter from './routes/authRouter.js'
import { JWT_SECRET } from './config/env.js'
import errorHandler from "./middleware/errorHandler.js";


if(!JWT_SECRET){
    console.log('FATAL: NO JWT SECRET KEY PROVIDED');
    console.log('Please provide the JWT_SECRET KEY in the .env.( development / production).local file');
   process.exit(1)
}
process.on('uncaughtException', (ex) =>{
    console.log('UNCAUGHT EXCEPTION DETECTED');
    console.log('EXCEPTION:', ex.message, ex)
    process.exit(1)
});


//middleware
const app = express()
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded(true))
app.use('/public', express.static('public'))
app.use('/images', express.static('images'))

// routes
app.get('/', (req, res ) => res.status(200).json({ success: true, message: 'Hello world!'}))
app.use('/api/auth', authRouter)


// error handlers
app.use(errorHandler)

// config
connectToDB()

export default app