const AbstractManager = require("./AbstractManager");

class ReservationManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "reservation" });
  }

  async create(reservation) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const result = await this.database.query(
      `INSERT INTO ${this.table} (datetime, is_cancelled, user_id, charging_point_id) VALUES (?, ?, ?, ?)`,
      [
        reservation.datetime,
        reservation.is_cancelled,
        reservation.user_id,
        reservation.charging_point_id,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readReservationByUser(userId) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select r.*, cp.name as charging_point_name,
        s.name as station_name, s.address as station_address
      from reservation r
      join charging_point cp on cp.id = r.charging_point_id
      join station s on s.id = cp.station_id
      where r.user_id = ?`,
      [userId]
    );

    // Return the first row of the result, which represents the user
    return rows;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async cancel(id) {
    const [rows] = await this.database.query(
      `update ${this.table} set is_cancelled = 1 where id = ?`,
      [id]
    );
    return rows;
  }

  /*   async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async update(reservation, id) {
    const [rows] = await this.database.query(
      `update ${this.table} set datetime = ?, is_cancelled = ?, user_id = ?, charging_point_id = ? where id = ?`,
      [
        reservation.datetime,
        reservation.is_cancelled,
        reservation.user_id,
        reservation.charging_point_id,
        id,
      ]
    );
    return rows;
  } */
}

module.exports = ReservationManager;
