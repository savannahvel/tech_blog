const router = require('express').Router();
const { Users } = require('../../models');
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');



// The `/api/users` endpoint

router.post('/login', async (req, res) => {
  try {
    // we search the DB for a user with the provided email
    const userData = await Users.findOne({ where: { username: req.body.username } });
    if (!userData) {
      // the error message shouldn't specify if the login failed because of wrong email or password
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }
    console.log("here")
      
    // use `bcrypt.compare()` to compare the provided password and the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    
    // console.log("here")
    console.log(validPassword)
    // if they do not match, return error message
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }
      
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
    // if they do match, return success message
    res.status(200).json({ message: 'You are now logged in!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

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
