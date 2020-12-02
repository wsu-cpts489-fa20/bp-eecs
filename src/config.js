import path from "path";

require('dotenv').config();

const LOCAL_PORT = 8080;
const DEPLOY_URL = process.env.PUBLIC_URL || "https://eecsdegree.bfapp.org/";
const PORT = process.env.HTTP_PORT || LOCAL_PORT;
const MONGO_STR = process.env.MONGO_STR;
const GH_CLIENT_ID = process.env.GH_CLIENT_ID;
const GH_CLIENT_SECRET = process.env.GH_CLIENT_SECRET;

const CLIENT_PATH = path.join(__dirname, '..', 'client', 'build');


// Check that options are set, and provide a more helpful error message if they're not.
const options = {
    MONGO_STR,
    GH_CLIENT_ID,
    GH_CLIENT_SECRET
}
for (const option in options) {
    if (options[option] === undefined) {
        throw new Error(
            `Environment variable "${option}" is undefined! Make sure that your environment provides the proper variables.`
        );
    }
}

export {DEPLOY_URL, PORT, MONGO_STR, GH_CLIENT_ID, GH_CLIENT_SECRET, CLIENT_PATH};
