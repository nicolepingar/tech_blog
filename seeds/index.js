//username & password setup
// blog post - post title, contents, post creator’s username, and date created

const sequelize = require('../config/connection');
const seedPosts = require('./postData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPosts();

  process.exit(0);
};

seedAll();
