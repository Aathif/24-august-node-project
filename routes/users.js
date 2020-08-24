const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');



//USer model

const User = require('../models/Users');

//Login page

router.get('/login', (req, res) => res.render('login'));

//Register page

router.get('/register', (req, res) => res.render('register'));

//Resgister Handle

router.post('/register', (req,res) =>{
    const {name, email, password, password2} = req.body;

    let errors = [];

    //check required fields

    if(!name || !email || !password || !password2){
        errors.push({msg: 'please fill in all details'});
    }

    //check password match

    if(password !== password2){
        errors.push({msg: 'passwords do not match'});
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        //validation success
        User.findOne({email: email})
        .then(user => {
            if(user){
                // User exists
                errors.push({msg: 'Email already exists'})
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2

                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                console.log(newUser)
                //Hash passwd
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;

                    newUser.save()
                    .then(user =>{
                        req.flash('success_msg'), 'you are now registered!!';
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));

                }))
            }
        });
    }

});

//Login Handle
router.post('/login', (req, res, next) =>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Handle

router.get('/logout', (req, res) =>{
    req.logOut();
    res.redirect('/users/login');
})

module.exports = router