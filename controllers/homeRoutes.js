const router = require('express').Router();
const { Posts } = require('../models');

// all pages you see when not logged in

//landing page
router.get('/', async (req, res) => {
    const postData = await Posts.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all', {posts});
    // res.json(posts)

})

router.get('/post/:id', async (req, res) => {
    const postData = await Posts.findOne({
        where: {
            id: req.params.id
        }
    });

    const post = postData.get({ plain: true });
    res.render('single', {...post});
    // res.json(posts)

})
module.exports = router;