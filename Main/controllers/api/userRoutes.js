const router = require('express').Router();
const { Users } = require('../../models');

// The `/api/products` endpoint

// Get all users
router.get('/', async (req, res) => {
    try { 
        const usersData = await Users.findAll();
        res.status(200).json(usersData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const userData = await Users.findByPk(req.params.id)

        if (!userData) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Create new user
router.post('/', async (req, res) => {
    // req body should look like: 
    // {
    //     "username": "user1",
    //     "password": "user1",
    //     "email": "user1@testing.com"
    // }

    try {
        const newUserData = await Users.create({
            ...req.body,
            username: req.body.username,
            password: req.body.password, // look into how to hash this and what needs to chang here
            email: req.body.email,
        })
        res.status(200).json(newUserData);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
