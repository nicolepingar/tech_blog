const router = require('express').Router();
const { Post, User, Comment } = require('../models');

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
        const posts = postData.map((post) =>
            post.get({ plain: true })
        );
        res.render('homepage', {
            posts,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one post for homepage
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_contents",
                        "comment_date" //// !!!!! user id?
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
        res.render('post', { post });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});