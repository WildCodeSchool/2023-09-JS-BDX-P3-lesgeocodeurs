const AbstractManager = require("./AbstractManager");

class StationManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "station" });
  }

  async create(station) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const result = await this.database.query(
      `INSERT INTO ${this.table} (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
      [station.name, station.address, station.latitude, station.longitude]
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
    const result = {
      ...rows[0],
      latitude: parseFloat(rows[0].latitude),
      longitude: parseFloat(rows[0].longitude),
    };
    // Return the first row of the result, which represents the user
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    const result = rows.map((row) => ({
      ...row,
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
    }));
    // Return the array of users
    return result;
  }

  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async update(station, id) {
    const [rows] = await this.database.query(
      `update ${this.table} set name = ?, address = ?, latitude = ?, longitude = ? where id = ?`,
      [station.name, station.address, station.latitude, station.longitude, id]
    );
    return rows;
  }
}

module.exports = StationManager;
