# CSCC09 Project

**Project Title**: Divide and Conquer

**Team Name**: Team sup(effort)

**Demo Link**: https://youtu.be/2TF7AcqRfWI

**Deployed Link**: https://divideandconquer.me

## Table of Contents

1. [Project Focus](#project-focus)
2. [Team Members](#team-members)
3. [Description of Web Application](#description-of-web-application)
4. [Complexity Points](#complexity-points)
   1. [Bonus Complexity Points](#bonus-complexity-points)
5. [Deliverables](#deliverables)
   1. [Alpha Version](#alpha-version)
   2. [Beta Version](#beta-version)
   3. [Final Version](#final-version)
6. [User Guide](#user-guide)
   1. [Dashboard](#dashboard)
      - [Profile](#profile)
      - [Competition](#competition)
   2. [Problems](#problems)
   3. [Coding/Lobby](#codinglobby)
   4. [Admin User](#admin-user)

## Project Focus

Backend-focused application with support for multiple users at a time, real-time updates and execution of code programs.

## Team Members

1. Jin Rong Cao, 1005043123
2. Winnie Lam, 1004971792
3. Justin Wang, 1005548481

## Description of Web Application

Our proposed web application is a _Binarysearch_ website clone, which steals features from Leetcode as well. The web application would have the ability for users to create “contests” with a specified number of coding questions, difficulty, chosen topics, company affiliation, and time limit where users are able to compete head to head to solve the problem. Users would have the ability to generate a link that can be shared with other users to join the contest. The application would support allowing users to compile code and run it against input test cases. When a user completes the contest, they can view the coding progress of the other contestants. As a paid feature, users would be allowed to view sample solutions to the problems.

## Complexity Points

The intended complexity points (9 of them) we aim to implement are:
| Name + Complexity Point| Purpose |
| ----------- | ----------- |
|Auth0: 1 Point| Allow user creation and authentication|
| SendGrid: 2 Points | To be used for sending verification emails, marketing emails (such as their rankings on a leadership board) and emails containing links to join the contest.|
| Stripe: 2 Points | To be used for paid premimum features|
| Socket.io: 2 Points| This will allow for communication between users more specifically for viewing coding progress in contests. |
| JDoodle: 1 Point | For compiling code programs |
| Monaco: 1 Point | Code editor for users to type in their solutions |

### Bonus Complexity Points

**Not Implemented**

Time and resource permitting we may integrate _Twilio_ (2 points) for 2 factor authentication and SMS communications.

## Deliverables

### Alpha Version

By the Alpha version, we aim to have three areas of the web application completed: users, code editor and deployment.

In the Alpha version, users would be able to create an account, login, solve problems on the site by using the provided code editor and have the code be ran and "graded" in the contests. There will also be feature for an adminstrative user who will have permissions to create or add new problems along with test cases. There will also be support for multiple users. Lastly, we aim to have the alpha version deployed.

### Beta Version

For the Beta version, we aim to include support for live coding between users via Socket.io,
send sign up for email verification via SendGrid and generate links to share with other users inviting them to "contests".

### Final Version

For the final version, it will include everything in the Alpha and Beta version but with paid premium features via Stripe. The application will be fully polished and deployed.

## User Guide

Some side notes while using the site:

- If the dashboard shows up as blank, **please click to the problems page and then click back to dashboard to load it properly**
- Use a real email so you can see SendGrid emails

### Dashboard

A home place for users. All you will need to navigate the site is here.

#### Profile

See all your account information in one place. This is also the place where you can upgrade your account to premium via a subscription. Premium will allow users to see and access the solutions tab in the coding page mid-competition. This is a pay to win feature.

For Stripe testing cards visit: https://stripe.com/docs/testing

#### Competition

Create or join a competition lobby here. To create a competition, choose a difficulty and it will select a random problem based on the difficulty to set up the lobby. To join a competition, enter the lobby ID to be redirected.

### Problems

Displays a list of all the problems we have in the database. Green represents an easy problem, yellow for medium, and red for hard. This page is just for viewing what problems are available.

### Coding/Lobby

This is where the competition takes place with you and a friend. You can invite them via email by entering their email and sending it off to your friend on the right panel. The lobby ID is also at the top of the right panel if you choose to message them instead. Once they join, you will see them join the chat and have a tab with their username above the code editor. This allows you to see their code in real time while they are trying to solve the problem, adding to the competing aspects.

The problem information is given in the left panel, and you solve it in the code editor in the middle. You can select which language you want to work with, and the respective starter code will display. When you have finished, hit submit code to compile. Test it against the test cases and see your results!

### Admin User

**Admin Account**:  
Email: admin@email.com  
Password: Admin123!

More admin accounts can be generated/granted access by first having them sign-up for a regular basic account. Then an admin once logged in can go to the dashboard and under users promote various users to admin previliges.

An adminastartive user can login in to the site and have the following priviliges:

- adding and/or editing problems
- adding and/or editing test cases for a particular problem
- viewing all users on the site
- promoting or downgrading user priviliges (basic to admin or admin to basic)

The above is all done via the Admin dashboard on the site.

**NOTE**: Please note that our code can only support String and number input and String and number output.
