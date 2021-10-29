const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// CREATE a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            contents: req.body.contents,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});
// CREATE a new comment 
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_contents: req.body.comment_contents,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });
        res.status(200).json(commentData)
        console.log("YOU GOT HERE!!");
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});
// UPDATE a post
router.put('/:id', withAuth, async (res, req) => {
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
// DELETE a post
router.delete('/:id', withAuth, async (res, req) => {
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

module.exports = router;