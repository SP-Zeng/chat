document.addEventListener("DOMContentLoaded", (_event) => {
  // Connect to socket.io
  const socket = io(); // automatically tries to connect on same port app was served from
  const username = document.getElementById("uname").innerText;
  const form = document.getElementById("chatForm");
  const messages = document.getElementById("messages");
  const messageToSend = document.getElementById("txt");

  //send welcome message
  welcomeMessage(username);
  socket.emit("uname", username);
  socket.emit("connected", username);
  
  
  form.addEventListener("submit", (event) => { // when the client sends a message
    socket.emit("message", {
      user: username,
      message: messageToSend.value,
    });
    messageToSend.value = "";
    event.preventDefault();
  });

  socket.on("new-user-connected-message", (username) => {
    const container = document.createElement('li');
    const badge = document.createElement("span")
    // print the element in green
    badge.classList.add("green");
    badge.classList.add("badge");
    badge.innerText = "BlooChatApp";
    container.appendChild(badge);
    const message = document.createElement("span");
    // print the message in green
    message.classList.add("green");
    message.innerHTML = "  " + username +' joined the room!';
    container.appendChild(message);
    messages.appendChild(container);
    autoscroll()
  });

  socket.on("disconnected-message", (username) => {
    const container = document.createElement('li');
    const badge = document.createElement("span")
    // set the badge to red
    badge.classList.add("red");
    badge.classList.add("badge");
    badge.innerText = "BlooChatApp";
    container.appendChild(badge);
    const message = document.createElement("span");
    // print the message in red
    message.classList.add("red");
    message.innerHTML = "  " + username +' left the room!';
    container.appendChild(message);
    messages.appendChild(container);
    autoscroll()
  });

  // append the chat text message
  socket.on("message", (msg) => {
    const container = document.createElement('li');
    const badge = document.createElement("span")
    badge.classList.add("yellow");
    badge.classList.add("badge");
    badge.innerText = msg.user;
    container.appendChild(badge);
    const message = document.createElement("span");
    message.innerHTML = "   " + msg.message;
    container.appendChild(message);
    messages.appendChild(container);
    autoscroll()
  });

  socket.on("online-message", users =>{
    const container = document.createElement('li');
    const badge = document.createElement("span")
    badge.classList.add("green");
    badge.classList.add("badge");
    badge.innerText = "BlooChatApp";
    container.appendChild(badge);
    const message = document.createElement("span");
    message.classList.add("green");
    let userlist = '';
    // if there is no one else in chatroom
    if(users.length <= 1) {
      userlist = 'Unfortunately no one is online at this momnent';
    }
    //loop over all users
    else {
      userlist = 'online users: '
      for(let i = 0; i < users.length; i++) {
        if(users[i] != username) {
          userlist += users[i];
          userlist += " "; // add another space
        }
      }
    }
    message.innerHTML = userlist;
    container.appendChild(message);
    messages.appendChild(container);
    autoscroll()
  });
});

// append the welcome message
function welcomeMessage(username){

  const container = document.createElement('li');
  const badge = document.createElement("span")
  badge.classList.add("green");
  badge.classList.add("badge");
  badge.innerText = "BlooChatApp";
  container.appendChild(badge);
  const message = document.createElement("span");
  message.classList.add("green");
  message.innerHTML = `Welcome ` + username +'!';
  container.appendChild(message);
  messages.appendChild(container);
  autoscroll()
}


function autoscroll(){ // autoscroll based on the project's spec
  var xH = messages.scrollHeight; 
  messages.scrollTo(0, xH);
}