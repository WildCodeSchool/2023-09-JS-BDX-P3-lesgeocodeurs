const AbstractManager = require("./AbstractManager");

class ChargingPointManager extends AbstractManager {
  constructor() {
    super({ table: "charging_point" });
  }

  async readPlugTypesOfChargingPoint(chargingPointId) {
    // Récupérer les types de prise d'une borne
    const [plugTypes] = await this.database.query(
      `select name from plug_type pt 
      join charging_point_plug_type cppt on pt.id = cppt.plug_type_id
      where charging_point_id = ?`,
      [chargingPointId]
    );
    return plugTypes.map((type) => type.name);
  }

  async read(id) {
    // Récupérer la borne
    const [rows] = await this.database.query(
      "select * from charging_point where id = ?",
      [id]
    );
    const result = rows[0];

    // Récupérer les types de prise de cette borne
    result.plug_types = await this.readPlugTypesOfChargingPoint(result.id);
    return result;
  }

  async readAll(stationId) {
    // Récupérer les bornes (filtrées ou non par station)
    let sql = "select * from charging_point";
    const sqlValues = [];
    if (stationId) {
      sql += " where station_id = ?";
      sqlValues.push(stationId);
    }
    const [rows] = await this.database.query(sql, sqlValues);

    // Récupérer les types de prise de chaque borne
    /* eslint-disable */
    for (const row of rows) {
      row.plug_types = await this.readPlugTypesOfChargingPoint(row.id);
    }
    return rows;
    /* eslint-enable */
  }

  async countAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database
      .query(`SELECT COUNT(*) AS charging_point_count FROM
    ${this.table}`);

    // Return the array of users
    return rows[0];
  }
  /*
  async create(ChargingPoint) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const result = await this.database.query(
      `INSERT INTO ${this.table} (name, power, station_id) VALUES (?, ?, ?)`,
      [ChargingPoint.name, ChargingPoint.power, ChargingPoint.station_id]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
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
  */
}

module.exports = ChargingPointManager;
