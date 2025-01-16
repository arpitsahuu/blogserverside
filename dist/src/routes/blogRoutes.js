"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogControllers_1 = require("../controllers/blogControllers");
const blogRouter = express_1.default.Router();
// get blogs or search blogs
blogRouter.get('/blogs', blogControllers_1.getBlogs);
// get blogs through id
blogRouter.get('/blog/:id', blogControllers_1.getBlogById);
exports.default = blogRouter;
