const AbstractManager = require("./AbstractManager");

class ChargingPointManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "charging_point" });
  }

  async create(ChargingPoint) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const result = await this.database.query(
      `INSERT INTO ${this.table} (name, power, station_id) VALUES (?, ?, ?)`,
      [ChargingPoint.name, ChargingPoint.power, ChargingPoint.station_id]
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

  async readAll(stationId) {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    let result;
    if (stationId) {
      result = await this.database.query(
        `select * from ${this.table} where station_id = ?`,
        [stationId]
      );
    } else {
      result = await this.database.query(`select * from ${this.table}`);
    }

    // Return the array of users
    return result[0];
  }

  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async update(ChargingPoint, id) {
    const [rows] = await this.database.query(
      `update ${this.table} set name = ?, power = ?, station_id = ? where id = ?`,
      [ChargingPoint.name, ChargingPoint.power, ChargingPoint.station_id, id]
    );
    return rows;
  }
}

module.exports = ChargingPointManager;
