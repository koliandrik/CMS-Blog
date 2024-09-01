const { Comment } = require('../models');

const commentdata = [
    {comment_text: 'comment 1',},
    {comment_text: 'comment 2',},
    {comment_text: 'comment 3',},
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;