const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// DELETE a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
        }
        console.log(postData);
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
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

module.exports = router;