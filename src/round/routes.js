import mongoose from "mongoose";
import express from 'express';
import {User} from './../user/schema';

const router = express.Router();

router.post('/:userId', async (req, res, next) => {
    console.log("in /rounds (POST) route with params = " +
        JSON.stringify(req.params) + " and body = " +
        JSON.stringify(req.body));
    if (!req.body.hasOwnProperty("date") ||
        !req.body.hasOwnProperty("course") ||
        !req.body.hasOwnProperty("type") ||
        !req.body.hasOwnProperty("holes") ||
        !req.body.hasOwnProperty("strokes") ||
        !req.body.hasOwnProperty("minutes") ||
        !req.body.hasOwnProperty("seconds") ||
        !req.body.hasOwnProperty("notes")) {
        //Body does not contain correct properties
        return res.status(400).send("POST request on /rounds formulated incorrectly." +
            "Body must contain all 8 required fields: date, course, type, holes, strokes, " + "minutes, seconds, notes.");
    }
    try {
        let status = await User.updateOne(
            {id: req.params.userId},
            {$push: {rounds: req.body}});
        if (status.nModified != 1) { //Should never happen!
            res.status(400).send("Unexpected error occurred when adding round to" +
                " database. Round was not added.");
        } else {
            res.status(200).send("Round successfully added to database.");
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send("Unexpected error occurred when adding round" +
            " to database: " + err);
    }
});

//READ round route: Returns all rounds associated
//with a given user in the users collection (GET)
router.get('/:userId', async (req, res) => {
    console.log("in /rounds route (GET) with userId = " +
        JSON.stringify(req.params.userId));
    try {
        let thisUser = await User.findOne({id: req.params.userId});
        if (!thisUser) {
            return res.status(400).message("No user account with specified userId was found in database.");
        } else {
            return res.status(200).json(JSON.stringify(thisUser.rounds));
        }
    } catch (err) {
        console.log()
        return res.status(400).message("Unexpected error occurred when looking up user in database: " + err);
    }
});

//UPDATE round route: Updates a specific round
//for a given user in the users collection (PUT)
router.put('/:userId/:roundId', async (req, res, next) => {
    console.log("in /rounds (PUT) route with params = " +
        JSON.stringify(req.params) + " and body = " +
        JSON.stringify(req.body));
    const validProps = ['date', 'course', 'type', 'holes', 'strokes',
        'minutes', 'seconds', 'notes'];
    let bodyObj = {...req.body};
    delete bodyObj._id; //Not needed for update
    delete bodyObj.SGS; //We'll compute this below in seconds.
    for (const bodyProp in bodyObj) {
        if (!validProps.includes(bodyProp)) {
            return res.status(400).send("rounds/ PUT request formulated incorrectly." +
                "It includes " + bodyProp + ". However, only the following props are allowed: " +
                "'date', 'course', 'type', 'holes', 'strokes', " +
                "'minutes', 'seconds', 'notes'");
        } else {
            bodyObj["rounds.$." + bodyProp] = bodyObj[bodyProp];
            delete bodyObj[bodyProp];
        }
    }
    try {
        let status = await User.updateOne(
            {
                "id": req.params.userId,
                "rounds._id": mongoose.Types.ObjectId(req.params.roundId)
            }
            , {"$set": bodyObj}
        );
        if (status.nModified != 1) {
            res.status(400).send("Unexpected error occurred when updating round in database. Round was not updated.");
        } else {
            res.status(200).send("Round successfully updated in database.");
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send("Unexpected error occurred when updating round in database: " + err);
    }
});

//DELETE round route: Deletes a specific round
//for a given user in the users collection (DELETE)
router.delete('/:userId/:roundId', async (req, res, next) => {
    console.log("in /rounds (DELETE) route with params = " +
        JSON.stringify(req.params));
    try {
        let status = await User.updateOne(
            {id: req.params.userId},
            {$pull: {rounds: {_id: mongoose.Types.ObjectId(req.params.roundId)}}});
        if (status.nModified != 1) { //Should never happen!
            res.status(400).send("Unexpected error occurred when deleting round from database. Round was not deleted.");
        } else {
            res.status(200).send("Round successfully deleted from database.");
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send("Unexpected error occurred when deleting round from database: " + err);
    }
});

export default router;
