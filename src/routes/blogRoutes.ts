import express from 'express';
import { getBlogById, getBlogs } from '../controllers/blogControllers';
const blogRouter = express.Router();

// get blogs or search blogs
blogRouter.get('/blogs',getBlogs);

// get blogs through id
blogRouter.get('/blog/:id',getBlogById);


export default blogRouter;