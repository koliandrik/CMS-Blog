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

router.get('/post/:id', async (req, res) => {
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

router.get('/dashboard', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
        });
    
        const user = userData.get({ plain: true });
    
        res.render('dashboard', {
        ...user,
        loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
    
        if (postData) {
        const post = postData.get({ plain: true });
    
        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn,
        });
        } else {
        res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.get('/new-post', (req, res) => {
    res.render('new-post', {
        loggedIn: req.session.loggedIn,
    });
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

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('signup');
    }
);

module.exports = router;
        