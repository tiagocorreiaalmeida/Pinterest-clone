const TwitterStrategy  = require("passport-twitter"),
    GithubStrategy = require("passport-github"),
    moment = require("moment");

const User = require("../models/user");

module.exports = (passport)=>{
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_ID,
        consumerSecret: process.env.TWITTER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK
    },(accessToken ,refreshToken, profile, done)=>{
            User.findOne({oauthID:profile.id, socialNetwork:"twitter"}).then((user)=>{
                if(user) return user;
                return new User({
                    oauthID: profile.id,
                    username:profile.username,
                    socialNetwork:"twitter",
                    createdAt:moment().valueOf()
                }).save()
            }).then(user=> done(null,user))
                .catch(e => done(e));
    }));

    passport.use(new GithubStrategy({
        clientID: process.env.GIT_ID,
        clientSecret: process.env.GIT_SECRET,
        callbackURL: process.env.GIT_CALLBACK
    },(accessToken, refreshToken, profile,done)=>{
        User.findOne({oauthID:profile.id, socialNetwork:"github"}).then((user)=>{
            if(user) return user;
            return new User({
                oauthID: profile.id,
                username:profile.username,
                socialNetwork:"github",
                createdAt:moment().valueOf()
            }).save()
        }).then(user => done(null,user))
            .catch(e =>done(e));
    }));

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        User.findById(id).then(user => done(null,user))
        .catch((e)=>{
            console.log(e);
        })
    });
}