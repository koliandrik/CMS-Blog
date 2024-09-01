const { Post } = require('../models');

const postdata = [
    {
        title: 'Today',
        content: 'Trial 1',
    },
    {
        title: 'Tomorrow',
        content: 'Trial 2',
    },
    {
        title: 'Yesterday',
        content: 'Trial 3',
    },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;