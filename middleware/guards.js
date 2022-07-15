const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const db = require("../model/helper");

/**
 * Guards are middleware that "protect" route functions
 **/

/**
 * Make sure the user is logged in
 **/

function ensureUserLoggedIn(req, res, next) {
  let token = _getToken(req);

  try {
    // Throws error on invalid/missing token
    jwt.verify(token, SECRET_KEY);
    // If we get here, a valid token was passed
    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

/**
 * Make sure user is logged in and is accessing his/her own page.
 * i.e. userId in token === userId in URL param
 **/

function ensureSameUser(req, res, next) {
  let token = _getToken(req);

  try {
    // Throws error on invalid/missing token
    let payload = jwt.verify(token, SECRET_KEY);
    // If we get here, a valid token was passed
    if (payload.userId === Number(req.params.id)) {
      next();
    } else {
      res.status(403).send({ error: "Forbidden" });
    }
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}
/***
 Make sure username is not taken or there is not already an account with that email.
***/

async function ensureUserDoesNotAlreadyExist(req, res, next) {
  const { username, email } = req.body;
  let sqlusername = `SELECT * FROM users WHERE username = "${username}"`;
  let slqemail = `SELECT * FROM users WHERE email = "${email}"`;

  try {
    let usernameExists = await db(sqlusername);
    console.log(usernameExists);
    let emailExists = await db(slqemail);

    if (usernameExists.data.length >= 1) {
      if (emailExists.data.length >= 1) {
        res.status(400).send({
          error:
            "There is already an account registered with these credentials. Try login or register using different credentials.",
        });
      }
      res.status(400).send({
        error: "username already exists. Try again with a new username.",
      });
    } else if (emailExists.data.length >= 1) {
      res.status(400).send({
        error: "There is already a registered account with this email",
      });
    }
    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

/**
 * Return the JWT token if found, else return ''
 * Authorization header string looks like: "Bearer <token>"
 **/

function _getToken(req) {
  // Return '' if header not found
  if (!("authorization" in req.headers)) {
    return "";
  }

  // Split header into 'Bearer' and token
  let authHeader = req.headers["authorization"];
  let [str, token] = authHeader.split(" ");

  return str === "Bearer" ? token : "";
}

module.exports = {
  ensureUserLoggedIn,
  ensureSameUser,
  ensureUserDoesNotAlreadyExist,
};
