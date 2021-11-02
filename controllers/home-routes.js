const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: [
                    "id",
                    "username"
                ],
            },],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_contents",
                        "user_id",
                        "post_id"
                    ], include: [{ model: User }],
                }],
        });
        const posts = postData.map((post) =>
            post.get({ plain: true })
        );
        console.log(posts[0].comments[0]);
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
                        "user_id",
                        "post_id"
                    ],
                    include: [{
                        model: User,
                        attributes: [
                            "id",
                            "username"
                        ]

                    }]
                },
            ],
        });
        const post = postData.get({ plain: true });
        console.log(post);
        res.render('postSingle', {
            loggedIn: req.session.loggedIn,
            post
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// get all posts by logged in user for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Post }, { model: Comment }]
        });
        const posts = userData.get({ plain: true });
        console.log(posts);
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
})
// login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
// sign up page
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});
// renders post page 
router.get('/post', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('post');
});

module.exports = router;