// Import access to database tables
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const plugtypes = await tables.plug_type.readAll();

    // Respond with the users in JSON format
    res.json(plugtypes);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const plugtype = await tables.plug_type.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (plugtype == null) {
      res.sendStatus(404);
    } else {
      res.json(plugtype);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
module.exports = {
  read,
  browse,
};
