const router = require('express').Router();
const { Posts } = require('../../models');

// The `/api/posts` endpoints

// Get all posts
router.get('/', async (req, res) => {
    try { 
        const postsData = await Posts.findAll();
        res.status(200).json(postsData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Posts.findByPk(req.params.id)
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get all posts from user <-- Do I need this? 
// router.get('/:id', async (req, res) => {
//     try {
//         const userPostsData = await Posts.findAll({
//             where: { 
//                 author_id: req.params.id,
//             }
//         })
//         if (!userPostsData) {
//             res.status(400).json({message: 'No Posts Found from User'})
//         }
//         res.status(200).json(userPostsData);
//     } catch (err) { res.status(400).json(err)}
// })

// Create a new post
router.post('/', async (req, res) => {
    // req body should look like: 
    // {
    //     "title": "Test Blog Post",
    //     "blog_text": "Lorem ipsum dolor",
    //     "author_id": "1"
    // }

    try {
        const newPostData = await Posts.create({
            ...req.body,
            title: req.body.title,
            blog_text: req.body.blog_text,
            author_id: req.body.author_id,
        })
        res.status(200).json(newPostData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// Update a post
router.put('/:id', async (req, res) => {
    try {
        const updatedPostData = await Posts.update(
            {
                ...req.body,
                title: req.body.title,
                blog_text: req.body.blog_text,
                author_id: req.body.author_id,
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        )
        res.status(200).json(updatedPostData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete a post
router.delete('/:id', async (req, res) => { 
    try { 
        const deletePostData = await Posts.destroy({
            where: {
                id: req.params.id,
            }
        })
        if (!deletePostData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json({ message: `Post id ${req.params.id} deleted successfully!` });
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
