var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../model/helper");
const { ensureUserDoesNotAlreadyExist } = require("../middleware/guards");

/**
 * Log in a user
 **/

router.post("/login", async (req, res) => {
  // the method is post because we are sending information
  let { username, password } = req.body; //we receive username and password in the request
  console.log(username);
  try {
    let results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    if (results.data.length === 0) {
      // Username not found
      res.status(401).send({ error: "Login failed" });
    } else {
      let user = results.data[0]; // the user's row/record from the DB
      let passwordsEqual = await bcrypt.compare(password, user.password); // it takes the password typed in, it compares it with the hashed password in our database
      if (passwordsEqual) {
        //Passwords match
        let payload = { userId: user.ID, username: user.username };
        // Create token containing user ID
        let token = jwt.sign(payload, SECRET_KEY);
        // Also return user (without password)
        delete user.password;
        res.send({
          message: "Login succeeded",
          token: token,
          user: user,
        });
      } else {
        // Passwords don't match
        res.status(401).send({ error: "Login failed" });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * Register a user
 **/

router.post("/register", ensureUserDoesNotAlreadyExist, async (req, res) => {
  let { username, password, email, owner } = req.body; // this gets the username and password that the user typed in and sends it in the body of the request.
  let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR); // this takes the typed in password and hashes it.

  try {
    let sql = `
              INSERT INTO users (username, email, password, owner)
              VALUES ('${username}','${email}','${hashedPassword}', ${owner})
          `;
    await db(sql);
    res.send({ message: "Registration succeeded" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
