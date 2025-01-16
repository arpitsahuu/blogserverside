require("dotenv").config({ path: "./.env" });
import express, { NextFunction, Request, Response } from "express";
import connectDB from "./src/models/dbConnection.js";
import cookieParser from "cookie-parser";
import morgan from "morgan"
import errorHandler from "./src/utils/errorHandler.js";
import { ErrorMiddleware } from "./src/middlewares/error.js";
import cors from "cors";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection
connectDB();

// api request limit
import { rateLimit } from 'express-rate-limit'
import blogRouter from "./src/routes/blogRoutes.js";
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})
app.use(limiter)

// logger
app.use(morgan("dev"));

const allowedOrigins = [
	'https://learnify-weld-three.vercel.app',"https://learnify-c8oz9jn8r-arpits-projects-1c6b9bf9.vercel.app",
	"http://localhost:3000",
];

// Configure CORS
app.use(cors({
	origin: "*",
	credentials: true,
	// optionsSuccessStatus: 200 ,// Address potential preflight request issues
	allowedHeaders: [
		'Content-Type', 
		'Authorization', 
		'X-Requested-With', 
		'Accept', 
		'Origin', 
		'X-Auth-Token'
	  ], // Specify the allowed headers for the CORS request
	  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.get("/",(req,res) =>{
    res.json({greed:"welcome to application"})
})

// version 1
app.use("/api/v1", blogRouter);

/* 404 */
app.all("*", (req: Request, res: Response, next: NextFunction) => {
	next(new errorHandler("Router " + req.originalUrl + " not forund ", 404));
});
  
/* error Handling */
app.use(ErrorMiddleware);


/* server */
app.listen(PORT || 3050, () => {
    console.log(`Server running on port ${PORT}`);
});