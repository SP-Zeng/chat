const debug = require("debug")("bloo-chat");
const nunjucks = require("nunjucks");
require("dotenv").config();
const express = require("express");
const auth = require("./routes/users.js");
const db = require("./data/db");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
var cookieParser = require('cookie-parser')
const { checkToken } = require("./util/middleware");

app.use(cookieParser())
app.use(express.json());

const port = process.env.PORT || 7000;

const users = {}; // keep username with the socket id
const user_list = []; // keep online users 
db.connect(); 

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("assets"));
app.use(auth);

app.get("/", (req, res) => {
  res.render("index.njk", null);
});

app.get("/chatroom",checkToken, async (req, res, next) => {
  try {
    res.render("chatroom.njk", { uname: req.cookies.username });
  } catch (err) {
    next(err);
  }
});

app.get("/login", (req, res) => {
  res.render("login.njk", null);
});

app.get("/register", (req, res) => {
  res.render("register.njk", null);
});

io.on("connection", function (socket) {

   //broadcast the join message to all other users
   socket.on("connected", (username) => {
    socket.broadcast.emit('new-user-connected-message', username);
    users[socket.id] = username;
    user_list.push(username);
    socket.emit('online-message', user_list);
  });


  socket.on("message", (msg) => {
    debug(`${msg.user}: ${msg.message}`);
    //Broadcast the message to everyone
    io.emit("message", msg);
  });

  //broadcast the leave message to all other users
  socket.on("disconnect", () => {
    if (users[socket.id] == null || socket.id == null) {  // accounts for the random/edge case where io connects without username 
      return;
    } else { 
      socket.broadcast.emit('disconnected-message',users[socket.id]);
      // delete the according user from the data structure
      let index = user_list.indexOf(users[socket.id]);
      user_list.splice(index, 1);
      delete users[socket.id];
    }
  });

});


http.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
