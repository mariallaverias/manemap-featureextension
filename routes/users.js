var express = require("express");
var router = express.Router();
const { ensureSameUser } = require("../middleware/guards");
const db = require("../model/helper");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

// GET user list
router.get("/", async function (req, res, next) {
  try {
    const results = await db("SELECT * FROM users");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", ensureSameUser, async function (req, res, next) {
  let { id } = req.params;
  let sql = "SELECT * FROM users WHERE ID = " + id;

  try {
    let results = await db(sql);
    // We know user exists because he/she is logged in!
    let user = results.data[0];
    delete user.password; // don't return the password
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body; // For now Im only letting the user update its email and password

    if (password) {
      console.log(password);
      let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
      console.log(hashedPassword);
      let sql = `
              UPDATE users SET password ='${hashedPassword}' WHERE ID = ${id}`;
      await db(sql);
      res.status(200).send({ message: "Password updated successfully" });
    }

    if (email) {
      let sql = `
      UPDATE users SET email='${email}' WHERE ID=${id}`;
      await db(sql);
      res.status(200).send({ message: "Email updated successfully" });
    }
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
