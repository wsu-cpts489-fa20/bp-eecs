import passport from 'passport';
import session from 'express-session';
import express from 'express';
import mongoose from 'mongoose';
import {github, local} from "./auth/strategies";
import {CLIENT_PATH, MONGO_STR, PORT} from "./config";
import {deserialize as userDeserialize, serialize as userSerialize} from "./user/schema";
import router from "./router";

//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////
mongoose.connect(MONGO_STR, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(
        () => {
            console.log(`Connected to ${connectStr}.`)
        },
        err => {
            console.error(`Error connecting to ${connectStr}: ${err}`)
        }
    );

//////////////////////////////////////////////////////////////////////////
//PASSPORT SET-UP
//The following code sets up the app with OAuth authentication using
//the 'github' strategy in passport.js.
//////////////////////////////////////////////////////////////////////////
for (const strategy of [local, github]) {
    passport.use(strategy);
}

passport.serializeUser(userSerialize);
passport.deserializeUser(userDeserialize);

//////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT. It also writes an express session
//to a cookie, and initializes a passport object to support OAuth.
/////////////////////////////////////////////////////////////////////////
const app = express()
app
    .use(session({
        secret: "speedgolf",
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 60}
    }))
    .use(express.static(CLIENT_PATH))
    .use(passport.initialize())
    .use(passport.session())
    .use(express.json({limit: '20mb'}))
    .use('/', router)
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
