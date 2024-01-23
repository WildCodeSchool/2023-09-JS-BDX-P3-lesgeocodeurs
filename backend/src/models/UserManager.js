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
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password) VALUES (?, ?)`,
      [user.email, user.password]
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

  async countAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`SELECT COUNT(*) AS user_count FROM
    ${this.table}`);

    // Return the array of users
    return rows[0];
  }
  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  async update(user, id) {
    const result = await this.database.query(
      `UPDATE ${this.table} SET first_name = ?, last_name = ?, birth_date = ?, postal_code = ?, city = ? WHERE id = ?`,
      [
        user.first_name,
        user.last_name,
        user.birth_date,
        user.postal_code,
        user.city,
        id,
      ]
    );
    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }

  // Find user by email (for login)
  async findUserByEmail(email) {
    const [rows] = await this.database.query(
      `select id, password from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }

  async getEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }

  async isAdmin(id) {
    const [rows] = await this.database.query(
      `select is_admin from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }
}

module.exports = UserManager;
