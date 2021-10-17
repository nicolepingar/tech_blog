const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: "CASCADE", // when we delete a user, associated posts are also deleted
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post };
