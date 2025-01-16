// blogPost.model.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { Request, Response } from 'express';

// Comment Interface
interface IComment {
  author: string;
  content: string;
  createdAt?: Date;
}

// Blog Post Content Block Interface
interface IContentBlock {
  type: 'paragraph' | 'image';
  value: string;
}

// Blog Post Interface
interface IBlogPost extends Document {
  title: string;
  author: string;
  content: IContentBlock[];
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments: IComment[];
}

// Comment Schema
const commentSchema: Schema<IComment> = new Schema({
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    minlength: [3, 'Author name must be at least 3 characters long'],
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    minlength: [5, 'Comment content must be at least 5 characters long'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Blog Post Schema
const blogPostSchema: Schema<IBlogPost> = new Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [100, 'Title must not exceed 100 characters'],
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  content: {
    type: [
      {
        type: {
          type: String,
          enum: ['paragraph', 'image'],
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    validate: [
      (val: IContentBlock[]) => val.length > 0,
      'Content must have at least one block',
    ],
  },
  image: {
    type: String,
    required: [true, 'Blog post image is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  comments: [commentSchema], // Embedding comments schema
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // Automatically add timestamps
});

// Index for search functionality
blogPostSchema.index({
  title: 'text',
  'content.value': 'text',
  author: 'text',
});

// Middleware to ensure updatedAt is set on update
blogPostSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);

// API Endpoints


export { BlogPost, IBlogPost, IComment };
