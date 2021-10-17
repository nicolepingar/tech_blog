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

// CREATE a new post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            user_id: req.body.user_id,
        });
        res.status(200).json(postData)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// CREATE a new comment

// UPDATE a post
router.put('/:id', async (res, req) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        if (!postData[0]) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// UPDATE a comment 

// DELETE a post
router.delete('/:id', async (res, req) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!postData[0]) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// DELETE a comment