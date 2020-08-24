const express = require('express');
const { models } = require('mongoose');
const {ensureAuth} = require('../config/auth');
const router = express.Router();

// Main Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard

router.get('/dashboard', ensureAuth, (req, res) => res.render('dashboard'));


module.exports = router;