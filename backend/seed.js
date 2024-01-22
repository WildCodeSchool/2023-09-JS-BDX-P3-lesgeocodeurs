// Load environment variables from .env file
require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");

// Build the path to the schema SQL file
const schema = path.join(__dirname, "database", "import.sql");

// Get database connection details from .env file
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Update the database schema
const mysql = require("mysql2/promise");

const seed = async () => {
  try {
    // Read the SQL statements from the schema file
    const sql = fs.readFileSync(schema, "utf8");

    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // Allow multiple SQL statements
      infileStreamFactory: (path1) => fs.createReadStream(path1),
    });

    // Switch to the newly created database
    await database.query(`use ${DB_NAME}`);

    // Drop the import table if it exists
    await database.query(`drop table if exists import`);

    // Empty existing tables
    await database.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await database.query(`truncate table charging_point_plug_type`);
    await database.query(`truncate table charging_point`);
    await database.query(`truncate table station`);
    await database.query(`SET FOREIGN_KEY_CHECKS = 1`);

    // Execute the SQL statements to update the database schema
    await database.query(sql);

    // Close the database connection
    database.end();

    console.info(`${DB_NAME} updated from ${schema} 🆙`);
  } catch (err) {
    console.error("Error updating the database:", err.message);
  }
};

// Run the seed function
seed();
