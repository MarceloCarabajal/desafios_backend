import * as services from '../services/user.service.js';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
//import 'dotenv/config';
import config from '../../envConfig.js';

const strategyConfig = {
    clientID: config.CLIENT_ID_GOOGLE,
    clientSecret: config.CLIENT_SECRET_GOOGLE,
    callbackURL: config.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
    state: true
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    try {
        //console.log(profile);
        const email = profile._json.email ?? '';
        const first_name = profile._json.given_name ?? '';
        const last_name = profile._json.family_name ?? '';
        const user = await services.getByEmail(email);
        if(user) return done(null, user);
        const newUser = await services.register({
            first_name,
            last_name,
            email,
            password: ' ',
            image: profile._json.picture,
            isGoogle: true
        });
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
};

passport.use('google', new googleStrategy(strategyConfig, registerOrLogin));

passport.serializeUser((user, done)=>{
    done(null, user._id)
});

passport.deserializeUser(async(id, done)=>{
    try {
        const user = await services.getUserById(id);
        return done(null, user);
    } catch (error) {
        done(error)
    }
});


