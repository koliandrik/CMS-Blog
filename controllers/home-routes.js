const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
        include: [
            {
            model: User,
            attributes: ['username'],
            },
            {
            model: Comment,
            include: [
                {
                model: User,
                attributes: ['username'],
                },
            ],
            },
        ],
        order: [['createdAt', 'DESC']],
        });
    
        const posts = postData.map((post) => post.get({ plain: true }));
    
        res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
        include: [
            {
            model: User,
            attributes: ['username'],
            },
            {
            model: Comment,
            include: [
                {
                model: User,
                attributes: ['username'],
                },
            ],
            },
        ],
        });
    
        const post = postData.get({ plain: true });
    
        res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.get('/comment/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
        include: [
            {
            model: User,
            attributes: ['username'],
            },
            {
            model: Comment,
            include: [
                {
                model: User,
                attributes: ['username'],
                },
            ],
            },
        ],
        });
    
        const post = postData.get({ plain: true });
    
        res.render('comment', {
        post,
        loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login');
    }
);

module.exports = router;
        