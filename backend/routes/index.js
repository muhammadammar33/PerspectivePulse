const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

//testing
router.get('/test', (req, res) => {
    res.json({ msg: "Hello World!" });
});

//user

//register
router.post('/register', authController.register);
//login
router.post('/login', authController.login);

//logout
//refresh

//blog
//CRUD
//create
//read all blogs
//read mlog by id
//update
//delete

//comment
//create comment
//read all comments
//read comment by id

module.exports = router;