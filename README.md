# Final Speedgolf App
This code base starts with the MERN stack MVP implmentation of the speedgolf
app as it was deployed to MongoDB Atlas and AWS EB in Chapter 24. To that it adds
some key features that were included as end-of-chapter exercises:

* Ability to reset password using security question/answer
* Ability to delete a speedgolf round
* Ability to edit and delete a user account

This repo serves as the starting code for all of the CptS 489 project teams in the
Fa20 semester. It will be pushed to their repos, deployed to their instances on
AWS EB, and served through https://[proj-name].bfapp.org.

To set up environment variables, do the following:
```shell script
cp .example.env .env
$EDITOR .env
```
You may swap `$EDITOR` for the text editor of your choice. Fill in the values.

The app is presently set be served to http://localhost:8081 through the command
npm run dev. You'll need to update DEPLOY_URL in main.js for remote deployment.