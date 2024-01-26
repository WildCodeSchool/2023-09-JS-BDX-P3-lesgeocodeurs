// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const stations = await tables.station.readAll();

    // Respond with the users in JSON format
    res.json(stations);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const station = await tables.station.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (station == null) {
      res.sendStatus(404);
    } else {
      res.json(station);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getByBounds = async (req, res, next) => {
  try {
    const stations = await tables.station.readByBounds(req.body);
    res.json(stations);
  } catch (err) {
    next(err);
  }
};

const getClusters = async (req, res, next) => {
  try {
    const stations = await tables.station.readClusters(req.body);
    res.json(stations);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  getByBounds,
  getClusters,
};
