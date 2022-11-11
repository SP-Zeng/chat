const button = document.getElementById("loginButn");
const messages = document.getElementById("messages");
let username = document.getElementById("username");
let password = document.getElementById("password");

window.onload = function() { // keep updating values when user types
    username.addEventListener("input", function() {});
    password.addEventListener("input", function() {})
;}

let sanitizeHTML = function (str) { // the function that sanitizes potential malicious input containing html elements
    return str.replace(/[^\w. ]/gi, function (c) {
      return '&#' + c.charCodeAt(0) + ';';
    });
};

const createUser = () => { 
    checked_username = sanitizeHTML(username.value);
    checked_password = sanitizeHTML(password.value);
    axios.post('/authenticate', { // send post to validate user-entered info
        username: checked_username,
        password: checked_password,
    })
    .then(function () {
        window.location.replace('/chatroom');
    })
    .catch(function() { // error adding it to the database 
        messages.innerHTML = "Username and Password Do not Match"
    });       
};


button.addEventListener("click", () => { // process login request
    messages.style.color = "Red";
    createUser()
});
