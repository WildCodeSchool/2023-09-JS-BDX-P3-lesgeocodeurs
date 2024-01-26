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

const chargingpointCount = async (req, res, next) => {
  try {
    const users = await tables.charging_point.countAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  chargingpointCount,
};
