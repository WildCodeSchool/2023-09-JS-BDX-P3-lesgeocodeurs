const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const result = await this.database.query(
      `INSERT INTO ${this.table} (email, password, first_name, last_name, birth_date, postal_code, city) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.email,
        user.password,
        user.firstName,
        user.lastName,
        user.birthDate,
        user.postalCode,
        user.city,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

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

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  async update(user) {
    const result = await this.database.query(
      `UPDATE ${this.table} SET (email, password, first_name, last_name, birth_date, postal_code, city) VALUES (?, ?, ?, ?, ?, ?, ?) WHERE id = ${user.id}`,
      [
        user.email,
        user.password,
        user.firstName,
        user.lastName,
        user.birthDate,
        user.postalCode,
        user.city,
        user.id,
      ]
    );
    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ${id}`
    );
    return result;
  }
}

module.exports = UserManager;
