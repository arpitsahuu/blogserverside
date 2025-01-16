"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: "./.env" });
const express_1 = __importDefault(require("express"));
const dbConnection_js_1 = __importDefault(require("./src/models/dbConnection.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_js_1 = __importDefault(require("./src/utils/errorHandler.js"));
const error_js_1 = require("./src/middlewares/error.js");
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Database connection
(0, dbConnection_js_1.default)();
// api request limit
const express_rate_limit_1 = require("express-rate-limit");
const blogRoutes_js_1 = __importDefault(require("./src/routes/blogRoutes.js"));
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 10 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
app.use(limiter);
// logger
app.use((0, morgan_1.default)("dev"));
const allowedOrigins = [
    'https://learnify-weld-three.vercel.app', "https://learnify-c8oz9jn8r-arpits-projects-1c6b9bf9.vercel.app",
    "http://localhost:3000",
];
// Configure CORS
app.use((0, cors_1.default)({
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
app.get("/", (req, res) => {
    res.json({ greed: "welcome to application" });
});
// version 1
app.use("/api/v1", blogRoutes_js_1.default);
/* 404 */
app.all("*", (req, res, next) => {
    next(new errorHandler_js_1.default("Router " + req.originalUrl + " not forund ", 404));
});
/* error Handling */
app.use(error_js_1.ErrorMiddleware);
/* server */
app.listen(PORT || 3050, () => {
    console.log(`Server running on port ${PORT}`);
});
