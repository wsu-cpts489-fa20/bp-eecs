import passportGithub from 'passport-github';
import passportLocal from 'passport-local';
import {DEPLOY_URL, GH_CLIENT_ID, GH_CLIENT_SECRET} from '../config';
import {User} from '../user/schema';

const github = new passportGithub.Strategy({
        clientID: GH_CLIENT_ID,
        clientSecret: GH_CLIENT_SECRET,
        callbackURL: `${DEPLOY_URL}/api/auth/github/callback`
    },
    //The following function is called after user authenticates with github
    async (accessToken, refreshToken, profile, done) => {
        console.log("User authenticated through GitHub! In passport callback.");
        //Our convention is to build userId from displayName and provider
        const userId = `${profile.username}@${profile.provider}`;
        //See if document with this unique userId exists in database
        let currentUser = await User.findOne({id: userId});
        if (!currentUser) { //Add this user to the database
            currentUser = await new User({
                id: userId,
                admin: false,
                displayName: profile.displayName,
                authStrategy: profile.provider,
                profilePicURL: profile.photos[0].value,
                rounds: []
            }).save();
        }
        return done(null, currentUser);
    });

const local = new passportLocal.Strategy({passReqToCallback: true},
    //Called when user is attempting to log in with local username and password.
    //userId contains the email address entered into the form and password
    //contains the password entered into the form.
    async (req, userId, password, done) => {
        let thisUser;
        try {
            thisUser = await User.findOne({id: userId});
            if (thisUser) {
                //console.log("start");
                //if (thisUser.admin === true)
                //{
                //    console.log("Admin");
                //}
                if (thisUser.password === password) {
                    return done(null, thisUser);
                } else {
                    req.authError = "The password is incorrect. Please try again or reset your password.";
                    return done(null, false)
                }
            } else { //userId not found in DB
                req.authError = `There is no account with email ${userId}. Please try again.`;
                return done(null, false);
            }
        } catch (err) {
            return done(err);
        }
    }
)

export {github, local};
