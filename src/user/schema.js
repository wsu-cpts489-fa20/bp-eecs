import mongoose from 'mongoose';

import {roundSchema} from '../round/schema'
import regeneratorRuntime from 'regenerator-runtime';

//Define schema that maps to a document in the Users collection in the appdb
//database.
const userSchema = new mongoose.Schema({
    id: String, //unique identifier for user
    password: String,
    admin: Boolean,
    displayName: String, //Name to be displayed within app
    authStrategy: String, //strategy used to authenticate, e.g., github, local
    profilePicURL: String, //link to profile image
    securityQuestion: String,
    securityAnswer: {
        type: String, required: function () {
            return !!this.securityQuestion
        }
    },
    rounds: [roundSchema]
});

const User = mongoose.model("User", userSchema);

const serialize = (user, done) => {
    console.log("In serializeUser.");
    console.log("Contents of user param: " + JSON.stringify(user));
    done(null, user.id);
}

const deserialize = async (userId, done) => {
    console.log("In deserializeUser.");
    console.log("Contents of userId param: " + userId);
    let thisUser;
    try {
        thisUser = await User.findOne({id: userId});
        console.log("User with id " + userId +
            " found in DB. User object will be available in server routes as req.user.")
        done(null, thisUser);
    } catch (err) {
        done(err);
    }
}

export {User, userSchema, serialize, deserialize};
