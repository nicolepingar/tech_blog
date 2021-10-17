const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: "CASCADE", // when a user is deleted, associated posts are also deleted
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: "CASCADE", // when a post is deleted, associated comments are also deleted
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});


module.exports = { User, Post, Comment };
