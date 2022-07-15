var express = require("express");
var router = express.Router();
const { ensureSameUser } = require("../middleware/guards");
const db = require("../model/helper");

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

module.exports = router;
