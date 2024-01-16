// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const reservations = await tables.reservation.readAll();

    // Respond with the users in JSON format
    res.json(reservations);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const reservation = await tables.reservation.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (reservation == null) {
      res.sendStatus(404);
    } else {
      res.json(reservation);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getReservationByUser = async (req, res, next) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.id;
    // Fetch a specific user from the database based on the provided ID
    const reservations = await tables.reservation.readReservationByUser(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (reservations == null) {
      res.sendStatus(404);
    } else {
      res.json(reservations);
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
  const reservation = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.reservation.create(reservation);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const cancel = async (req, res, next) => {
  try {
    const result = await tables.reservation.cancel(req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

/* const destroy = async (req, res, next) => {
  try {
    await tables.reservation.delete(req.params.id);
    const reservationDeleted = await tables.reservation.read(req.params.id);
    if (reservationDeleted === null) {
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
    const result = await tables.reservation.update(req.body, req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
}; */

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  add,
  cancel,
  getReservationByUser,
};
