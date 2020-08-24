const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const app = express();

//passport config

require('./config/passport')(passport);

//db connection

mongoose.connect('mongodb://localhost/24-august-project',{useNewUrlParser:true,useUnifiedTopology:true},
    err => {
        if (!err)
            console.log('Mongodb connection succeeded.')
        else
            console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))
    })
async = require('async');


//EJS

app.use(expressLayouts);
app.set('view engine', 'ejs');


// Bodyparser
app.use(express.urlencoded({extended: false}));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//Passport middleware

app.use(passport.initialize());
app.use(passport.session());
// connect flash
app.use(flash());

//global var

// app.use((req, res, next) =>{
//     res.locals.success_msg = req.flash('success_msg'),
//     res.locals.error_msg = req.flash('error_msg')

// });


//Routes

app.use('/', require('./routes/index'));


app.use('/users', require('./routes/users'))




const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started at port ${PORT}`));