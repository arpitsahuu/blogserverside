"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPost = void 0;
// blogPost.model.ts
const mongoose_1 = __importStar(require("mongoose"));
// Comment Schema
const commentSchema = new mongoose_1.Schema({
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
const blogPostSchema = new mongoose_1.Schema({
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
            (val) => val.length > 0,
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
const BlogPost = mongoose_1.default.model('BlogPost', blogPostSchema);
exports.BlogPost = BlogPost;
