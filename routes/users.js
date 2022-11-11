const express = require("express");
const { createToken, verifyToken } = require("../util/token");
const { verifyPassword } = require("../util/hashing");
const UserDao = require("../data/UserDao");

const router = express.Router();
const users = new UserDao();

router.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await users.create({ username, password, role: "CLIENT" });
      const token = createToken(user);
      res.clearCookie('token'); 
      res.cookie('token', token, { // use https-only cookie to avoid XSS
        secure: true, 
        httpOnly: true,
      });
      res.cookie('username', username, {
        secure: true, // use https-only cookie to avoid XSS
        httpOnly: true,
      });
      return res.status(201).json({
        message: "Authentication successful!",
      });
    } catch (err) { // username already exist
      // erase the cookie 
      res.clearCookie('token');
      return res.status(err.status || 400).json({ message: err.message });
    }
});

router.post("/authenticate", async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        message: "You must provide both username and password.",
      });
    }

    try {
      const user = await users.readOne(username);
      // Authentication!
      const isAuthenticated = await verifyPassword(password, user ? user.password : "");
      if  (!isAuthenticated) {
        res.clearCookie('token'); // erase the cookies
        return res.status(403).json({
          message: "Wrong username or password!",
        });
      } else {
        const token = createToken(user); // create token
        res.clearCookie('token');
        res.cookie('token', token, { // use https-only cookie to avoid XSS
          secure: true, 
          httpOnly: true,
        });
        res.cookie('username', username, {
          secure: true, // use https-only cookie to avoid XSS
          httpOnly: true,
        });
        return res.status(201).json({
          message: "Authentication successful!",
        });
      }
    } catch (err) {
      return res.status(err.status || 500).json({ message: err.message });
    }
  });

module.exports = router;