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


## Week 3
(a) Please grade these files for code quality:
1. [StudentHomePage](https://github.com/wsu-cpts489-fa20/bp-eecs/blob/master/client/src/components/StudentHomePage.js)
2. [AdminView](https://github.com/wsu-cpts489-fa20/bp-eecs/blob/master/client/src/components/AdminView.js)

(b) Summary of Work

This week our group achieved the tasks we set out to do in week 3's milestone. We separated the admin view and the student view based on the user account. For the admin view, we fixed the router issues when adding, editing, and deleting courses from any of the course tables. Now when we add a course to the course tables, it will correctly be added and displayed in the table. We also separated the 4 majors into their own tables and when a course is being added, it will be added to the correct major's table. We also fixed the logout functionality that was broken in week 2. For user accounts, a newly created user account is aa non admin account by default. The only way to change the user account to an admin is to ggo into the database and change the admin argument to true. When logging in as a student, the user is redirected to the student view home page. This homepage is only available to the user of the account and is connected to them. This home page will be our primary focus on the last week 4. Right now, it displays an empty table of all the courses the user selects, a welcome title, and an empty space for our dependency graph. These features will all be implemented next week. Finally, we deployed our application to AWS elastic beanstalk. It is available over the url: https://eecsdegree.bfapp.org/. We also removed the build files for the root directory and the client directory that were needed on the github page. This makes the files of our github page look more clean and organized. We have everything set up for our final week 4 to finish our project.

## Week 4
(a) Please grade these files for code quality:
1. [StudentHomePage](link)
2. [StudentTable](link)

(b) Summary of Work
This week, our team achieved most of the tasks we set out in week 4's milestone. We were unable to meet some of our stretch goals, such as electives for students and students providing their grades to the application. We touched up on some of the admin bugs and features when logged in as an admin. We can now edit and delete the courses from the admin table. Also, we added two new arguments for adding a major course: checkboxes with the 4 majors (selecting one of them will show that course in the respective tables), and a dropdown for when the course is offered (fall, spring, or summer). These elements will be used throughout our program for displaying to admin tables and student tables. For the student view, we added a student table, which shows all the courses that the admin user added. There is a dropdown for the student to select what major they want to view, and it will show all the courses associated with that major in a table. Additionally, we didn't have enough time to complete a course dependency graph showing pre-requisites for different courses. However, we did provide a picture of how we wanted it to look and how it might be implemented later in the future. This dependency graph provides the user with insight about a course they select, and shows all the pre-requisite courses that the user must take in order to take their selected course.
