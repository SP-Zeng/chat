const button = document.getElementById("registerButn");
const messages = document.getElementById("messages");
let username = document.getElementById("username");
let password = document.getElementById("password");

let sanitizeHTML = function (str) { // the function that sanitizes potential malicious input containing html elements
    return str.replace(/[^\w. ]/gi, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
};

window.onload = function() { // keep updating values when user types
    username.addEventListener("input", function() {});
    password.addEventListener("input", function() {})
;}

const createUser = () => {
    checked_username = sanitizeHTML(username.value);
    checked_password = sanitizeHTML(password.value);
    axios.post('/register', { // send post request to register
        username: checked_username,
        password: checked_password,
    })
    .then(function () {
        window.location.replace('/chatroom');
    })
    .catch(function() {
        messages.innerHTML = "Username Already Existed"
    });        
};


button.addEventListener("click", () => { // process register request
    messages.style.color = "Red";
    if (username.value == "" || password.value == "") {
        messages.innerHTML = "You must provide both username and password"
        return;
    }
    createUser()
});
