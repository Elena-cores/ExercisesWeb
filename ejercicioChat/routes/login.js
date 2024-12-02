const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/', (req, res) => {
    const username = req.body.username;
    if (username) {
        req.session.user = username; // guardar user en session
        res.redirect('/chat');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
