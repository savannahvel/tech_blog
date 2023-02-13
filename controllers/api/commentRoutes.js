const router = require('express').Router();
const { Comments } = require('../../models');

// The `/api/comments` endpoints

// Get all comments
router.get('/', async (req, res) => {
    try { 
        const commentsData = await Comments.findAll();
        res.status(200).json(commentsData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get comment by id
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comments.findByPk(req.params.id)
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get all comments from user <-- Do I need this? 
// router.get('/:id', async (req, res) => {
//     try {
//         const userCommentsData = await Comments.findAll({
//             where: { 
//                 user_id: req.params.id,
//             }
//         })
//         if (!userCommentsData) {
//             res.status(400).json({message: 'No Comments Found from User'})
//         }
//         res.status(200).json(userCommentsData);
//     } catch (err) { res.status(400).json(err)}
// })

// Create a new comment
router.post('/', async (req, res) => {
    /**
     * {
            "comment": "This is great content!", 
            "post_id": 3,
            "user_id": 2
        }
     */
    try {
        const newCommentData = await Comments.create({
            ...req.body,
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.body.user_id,
        })
        res.status(200).json(newCommentData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// Update a comment
router.put('/:id', async (req, res) => {
    try {
        const updatedCommentData = await Comments.update(
            {
                ...req.body,
                comment: req.body.comment,
                post_id: req.body.post_idt,
                user_id: req.body.user_id,
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        )
        res.status(200).json(updatedCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete a comment
router.delete('/:id', async (req, res) => { 
    try { 
        const deleteCommentData = await Comments.destroy({
            where: {
                id: req.params.id,
            }
        })
        if (!deleteCommentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(deleteCommentData);
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
