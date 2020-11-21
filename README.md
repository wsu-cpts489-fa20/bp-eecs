# EECS Course Scheduler

Team
- Brownell, David
- Singer, Nicholas Johnathan
- Lee, John Kimin
- Magbag, Troy Clarence
- Donegan, Connor Crawford
          

Last Updated: 11/20/2020 

## Week 2
(a) Please grade these files for code quality:

    1. bp-eecs/client/src/components/App.js
    2. bp-eecs/client/src/components/RoundsTable.js

(b) Summary of Work

This week our group achieved much of the results we planned for the week 2 milestone. We finished the primary design of the admin display. This began by tracking whether or not a user is a admin or student using an boolean admin property in the user schema. We added a pair of radio buttons on the login page so users have a clear expectation of what type of account they have before logging in. These radio buttons will be used in the next development cycle to communicate to the server which account the user is attempting to login with. Next, we created the major views for the admin. This consists of 4 tables representing the 4 majors of EECS. Each table has a list of the courses which belong to that major and other related fields.  We addressed GitHub issue #4 to allow admin users the ability to add, edit, and remove courses from a major's table of courses. Instead of using the standard mode switch structure from the SpeedGolf app, our team decided to integrate React Router into our project to view the different modes. The purpose of this integration was to make the project more efficient, structure wise, as well as to gain experience with React Router, which 4/5 of our team members were unfamiliar with. We have effectively set up the foundation to begin work for the next milestone, which includes creating the course dependencies as well as the student user views.