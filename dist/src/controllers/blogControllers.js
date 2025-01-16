"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSampleBlogs = exports.getBlogById = exports.getBlogs = void 0;
const blogModel_1 = require("../models/blogModel");
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
exports.getBlogs = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, search = '' } = req.query;
    // Construct the query
    const query = {};
    if (search) {
        const searchRegex = new RegExp(search.toString(), "i");
        query.title = { $regex: searchRegex }; // Use correct syntax for dynamic property
    }
    // Fetch paginated and filtered posts
    const posts = yield blogModel_1.BlogPost.find(query)
        .sort({ createdAt: -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit);
    // Calculate total documents and total pages
    const total = yield blogModel_1.BlogPost.countDocuments(query);
    const totalPages = Math.ceil(total / +limit);
    // Log posts for debugging
    // Return the response
    return res.status(200).json({
        posts,
        total,
        totalPages, // Include total pages for pagination
        page: +page,
        limit: +limit,
    });
}));
exports.getBlogById = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield blogModel_1.BlogPost.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        console.log(post, "post");
        return res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch blog post', error });
    }
}));
exports.insertSampleBlogs = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("enter data");
    const additionalSampleBlogs = [
        {
            title: 'The Benefits of Practicing Gratitude',
            author: 'Ethan Walker',
            content: [
                { type: 'paragraph', value: 'Gratitude is a powerful practice that can transform your perspective on life. By focusing on the positive aspects of your day, you cultivate a mindset of abundance and appreciation. Start a gratitude journal, noting three things you’re thankful for each day. Over time, this habit shifts your focus from what’s lacking to what’s fulfilling.' },
                { type: 'paragraph', value: 'Gratitude has been shown to improve relationships, reduce stress, and enhance overall happiness. Sharing gratitude with others by expressing appreciation strengthens connections and spreads positivity. Even during challenging times, finding small moments of gratitude can bring comfort and resilience. Embracing gratitude leads to a more content and joyful life.' }
            ],
            image: 'https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
            title: 'How to Create a Productive Morning Routine',
            author: 'Lily Thompson',
            content: [
                { type: 'paragraph', value: 'A productive morning routine sets the tone for the rest of your day. Start by waking up at a consistent time and avoid reaching for your phone immediately. Instead, engage in activities that energize and motivate you. This could include exercising, meditating, or reading a chapter from a book.' },
                { type: 'paragraph', value: 'Planning your day during the morning helps prioritize tasks and boosts efficiency. A nutritious breakfast fuels your body and mind for the challenges ahead. Customize your routine to suit your goals and preferences, and remember that consistency is key. With the right morning habits, you can achieve more and feel accomplished before the day even begins.' }
            ],
            image: 'https://images.unsplash.com/photo-1501447332310-d7343124aa0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
            title: 'Travel Tips for First-Time Explorers',
            author: 'Noah Davis',
            content: [
                { type: 'paragraph', value: 'Traveling for the first time can be both exciting and intimidating. Start by researching your destination to understand its culture, climate, and must-visit spots. Pack light but efficiently, focusing on essentials and versatile clothing. Familiarize yourself with local transportation options to save time and money.' },
                { type: 'paragraph', value: 'Be open to new experiences and don’t hesitate to step out of your comfort zone. Respect local customs and learn a few basic phrases in the native language to connect with the locals. Always keep copies of important documents and have a plan for emergencies. With preparation and an adventurous spirit, your first trip can become a lifetime memory.' }
            ],
            image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
            title: 'Digital Detox: Reclaiming Your Time',
            author: 'Charlotte Evans',
            content: [
                { type: 'paragraph', value: 'In today’s digital age, constant connectivity can lead to stress and burnout. A digital detox helps you regain control by setting boundaries with technology. Start small by designating tech-free hours during your day. Use this time to engage in offline activities like reading, exercising, or spending quality time with loved ones.' },
                { type: 'paragraph', value: 'Turning off notifications and limiting social media use reduces distractions and enhances focus. Disconnecting from screens allows your mind to relax, improving sleep quality and mental health. Regular digital detoxes create a healthier relationship with technology, helping you reclaim your time and prioritize what truly matters.' }
            ],
            image: 'https://images.unsplash.com/photo-1526378734915-2c332a0d49b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
            title: 'The Importance of Lifelong Learning',
            author: 'Mason Carter',
            content: [
                { type: 'paragraph', value: 'Lifelong learning is essential for personal and professional growth. In a rapidly changing world, staying curious and acquiring new skills keeps you relevant and adaptable. Embrace opportunities to learn, whether through online courses, books, or hands-on experiences.' },
                { type: 'paragraph', value: 'Learning goes beyond formal education—it’s about developing hobbies, exploring interests, and challenging yourself. By cultivating a growth mindset, you build resilience and a sense of purpose. Lifelong learning enriches your life, opening doors to new possibilities and fostering a deeper understanding of the world around you.' }
            ],
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
        }
    ];
    console.log("enter data");
    yield blogModel_1.BlogPost.insertMany(additionalSampleBlogs);
    console.log("data inserted");
    return res.status(201).json({ message: 'Sample blogs inserted successfully.' });
}));
