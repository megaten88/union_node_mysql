const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const database = require('../database');
const extractJwt = require('passport-jwt').ExtractJwt;

require('dotenv').config()
let opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKENIZER,
    algorithms: [process.env.JWT_ALGORITHM]
};

passport.use('login',new jwtStrategy(opts,async function(jwtPayload,done){
    let rows = await  database.query('SELECT * FROM users WHERE id = ?',[jwtPayload.sub]);
    if(rows.length > 0){
        let user = rows[0];
        next(null,user);
    }else{
        return done(null,false);
    }
}));
