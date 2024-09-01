const sequelize = require('../config/connection');
const seedPosts = require('./post-seeds');
const seedComment = require('./comment-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPosts();

  await seedComment();

  process.exit(0);
};

seedAll();