const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
//!!! get all of users posts for dashboard
// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        console.log(postData);
        const posts = postData.map((post) =>
            post.get({ plain: true })
        );
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn


        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// GET one post for homepage
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_contents",
                        "post_id"
                    ]
                },
                {
                    model: User,
                    attributes: [
                        "id",
                        "username"
                    ]
                },
            ],
        });
        const post = postData.get({ plain: true });
        res.render('postSingle', { post });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/post', (req, res) => {
    console.log(!req.session.loggedIn);
    // If the user is already logged in, redirect the request to another route
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('post');
});

module.exports = router;