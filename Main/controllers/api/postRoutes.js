const router = require('express').Router();
const { Posts } = require('../../models');

// The `/api/posts` endpoints

// Get all posts

// Get all posts from user

// Create a new post
router.post('/', async (req, res) => {
    // req body should look like: 
    // {
    //     "username": "user1",
    //     "password": "user1",
    //     "email": "user1@testing.com"
    // }

    try {
        const newPostData = await Posts.create({
            ...req.body,
            blog_text: req.body.blog_text,
            user_id: req.body.user_id,
        })
        res.status(200).json(newPostData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// Update a post