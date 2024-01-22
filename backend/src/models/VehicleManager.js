const AbstractManager = require("./AbstractManager");

class VehicleManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "vehicle" });
  }

  async create(vehicle) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const result = await this.database.query(
      `INSERT INTO ${this.table} (brand, model, user_id, plug_type_id) VALUES (?, ?, ?, ?)`,
      [vehicle.brand, vehicle.model, vehicle.user_id, vehicle.plug_type_id]
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

  async readCarByUser(userId) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where user_id = ?`,
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

  async countAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database
      .query(`SELECT COUNT(*) AS vehicle_count FROM
    ${this.table}`);

    // Return the array of users
    return rows[0];
  }

  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async update(vehicle, id) {
    const [rows] = await this.database.query(
      `update ${this.table} set brand = ?, model = ?, user_id = ?, plug_type_id = ? where id = ?`,
      [vehicle.brand, vehicle.model, vehicle.user_id, vehicle.plug_type_id, id]
    );
    return rows;
  }
}

module.exports = VehicleManager;
