const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const app = express();
app.use(cookieParser());
app.use(session({keys: ['secret']}));
app.use(passport.initialize());
app.use(passport.session());

//authentication
passport.use(new LocalStrategy((username, password, done) =>{
    if(username !== 'admin'){
        return done(null, false);
    }
    if(password !== 'admin'){
        return done(null, false);
    }

    return done(null, {firstName: 'Vasya' ,  lastName: "Pupkin"});
}))

const authHandler = passport.authenticate('local' , {
    successRedirect: '/user',
    failureRedirect: '/failedauth',
})

app.get('/auth' , (req, res) => {
    res.render('auth');
})

app.post('/auth' , authHandler)

const mustBeAuthenticated = (req, res, next) =>{
    if(req.user){
        next();
    } else {
        res.redirect('/auth')
    }
}

app.all('/user' , mustBeAuthenticated);
app.all('/user/*' , mustBeAuthenticated);


app.listen(3002)