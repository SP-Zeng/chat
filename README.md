[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7655772&assignment_repo_type=AssignmentRepo)
# Homework 5: Bloo Chat!

A simple realtime messaging application build with Node, Express, and Socket.io.

After cloning the application, run `npm install` to install the dependencies. 

To run the application, use the command `npm run dev`.

Detailed instructions are at this [url](https://cs280spring.github.io/hw/hw5/index.html).

The application is deployed on [Heroku](https://medoa-chat.herokuapp.com/).

High Level Description:


This Bloo-Chat app is built with Node.js, Express, Socket.io, with noticable features such as real-time(synchronous) chatting platform between different users, user info authentication with a login / register system, and an improved security check against basic XSS. 

The user information is stored using MongoDB, and please also note that the data is not clear for the submission so there might be dummy usernames already used.

The user info authentication involves both frontend login/register pages, whose HTML components are templated using Nunjucks templating and scripts are written in js. After the users enter relevant information, it will make a HTTP post request using axios to the relevant routes containing the XSS-sanitized username and password from the users. Password will then be salted and hashed using bcrypt. The user info (username and hased password) will be compared in the database, and depending on the request and the results of the comparison from the db, user info may be inserted into the db, or an error message will be displayed to the users indicating error conditions such as user already exist for a register event. If it is a successful event, the server will generate a jwt token for the user and store the token in the HTTP-only cookies to the client/user, which help improve web security and defend against XSS. The user will then be redirected to the chatroom page, which is protected by middleware function checking the token stored in the HTTP-only cookies.

The synchronous messaging system is achieved by using socket.io that governs the web socket connections to the node.js server (based on index.js). That will allow the server broadcast and send messages to all connected clients (based on script.js). When the client emits the relevant messages to the server, the server will receive them and broadcast it to other users connected to the server, and in this way, we can achieve the real-time messaging feature.

And fianlly, this app is deployed at Heroku CLI. 

Thank you!
