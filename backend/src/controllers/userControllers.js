// Import access to database tables
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

function generateAccessToken(username) {
  return jwt.sign(username, process.env.APP_SECRET, { expiresIn: "1600s" });
}

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.user.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const usersCount = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.user.countAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  try {
    // Insert the user into the database
    const modifiedUser = await tables.user.update(req.body, req.params.id);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    if (modifiedUser !== null) {
      res.status(201).json({ req: "worked" });
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const user = req.body;
  const notHashedPassword = user.password;

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const id = await tables.user.create(user);
    const token = generateAccessToken({ id });
    res.status(201).json({ token });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      const mayUser = await tables.user.getEmail(user.email);
      if (await bcrypt.compare(notHashedPassword, mayUser.password)) {
        // eslint-disable-next-line prefer-destructuring
        const id = mayUser.id;
        if (mayUser.birth_date) {
          res.status(409).json({ err: "Compte existant" });
        } else {
          const tokenHR = generateAccessToken({ id });
          res.status(409).json({ token: tokenHR, err: "Half-register" });
        }
      } else {
        res.status(409).json({ err: "Email indisponible" });
      }
    }
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  try {
    const result = await tables.user.delete(req.params.id);
    // const userDeleted = await tables.user.read(req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error(err);
    next(err);
  }
};

// Login operation
const login = async (req, res, next) => {
  const user = await tables.user.findUserByEmail(req.body.email);
  if (user == null) {
    res.sendStatus(400);
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const newUser = { ...user };
      delete newUser.password;
      const token = generateAccessToken(newUser);
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
};

const checkEmail = async (req, res) => {
  const emailToCheck = tables.user.getEmail(req.body.email);
  if (emailToCheck) {
    res.sendStatus(404).json({ message: "" });
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  login,
  checkEmail,
  usersCount,
};
