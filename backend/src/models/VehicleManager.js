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

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async delete(id) {
    const result = await this.database.query(
      `delete from vehicle where id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = VehicleManager;
