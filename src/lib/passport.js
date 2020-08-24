const passport = require('passport');
const localStategy = require('passport-local').Strategy

passport.use('signup',new localStategy({
    usernameField: 'username',
    passwordField: 'user_password',
    passReqToCallback: true
}, async (req,username,password,done) =>{
    console.log(req.body)
}));

// passport.serializeUser((usr,done)=>{

// });