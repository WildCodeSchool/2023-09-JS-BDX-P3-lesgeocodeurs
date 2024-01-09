// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const chargingpoints = await tables.charging_point.readAll(
      req.query?.station_id
    );

    // Respond with the users in JSON format
    res.json(chargingpoints);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const chargingpoint = await tables.charging_point.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (chargingpoint == null) {
      res.sendStatus(404);
    } else {
      res.json(chargingpoint);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const chargingpoint = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.charging_point.create(chargingpoint);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.charging_point.delete(req.params.id);
    const chargingpointDeleted = await tables.charging_point.read(
      req.params.id
    );
    if (chargingpointDeleted === null) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const result = await tables.charging_point.update(req.body, req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  add,
  destroy,
  edit,
};
