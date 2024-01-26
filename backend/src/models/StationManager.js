const AbstractManager = require("./AbstractManager");

class StationManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "station" });
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
    const [rows] = await this.database.query(
      `select * from ${this.table} limit 1000`
    );
    const result = rows.map((row) => ({
      ...row,
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
    }));
    return result;
  }

  async readByBounds(bounds) {
    const { south, north, west, east } = bounds;
    const [rows] = await this.database.query(
      `select * from station
          where latitude between ? and ? and longitude between ? and ? 
          limit 100000`,
      [south, north, west, east]
    );
    const result = rows.map((row) => ({
      ...row,
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
    }));
    return result;
  }

  async readClusters(bounds) {
    const { south, north, west, east } = bounds;
    const [rows] = await this.database.query(
      `SELECT COUNT(id) AS count,
      ROUND(latitude, 0) AS lat,
      ROUND(longitude, 0) AS lon
      FROM station
      where latitude between ? and ? and longitude between ? and ? 
      GROUP BY lat, lon
      limit 100000`,
      [south, north, west, east]
    );
    const result = rows.map((row) => ({
      ...row,
      latitude: parseFloat(row.lat),
      longitude: parseFloat(row.lon),
    }));
    return result;
  }
}

module.exports = StationManager;
