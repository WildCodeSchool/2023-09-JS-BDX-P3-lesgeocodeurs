const AbstractManager = require("./AbstractManager");

class ChargingPointManager extends AbstractManager {
  constructor() {
    super({ table: "charging_point" });
  }

  // Morceau de SQL commun aux 2 requêtes READ
  baseSql = `select cp.*, pt.name as plug_type
  from charging_point cp
  join charging_point_plug_type cppt on cp.id = cppt.charging_point_id
  join plug_type pt on pt.id = cppt.plug_type_id`;

  async read(id) {
    // Construire et exécuter la requête SQL
    const where = " where cp.id = ?";
    const [rows] = await this.database.query(this.baseSql + where, [id]);

    // Regrouper les résultats en 1 seule borne qui a une liste de prises
    const result = rows[0];
    result.plug_type = rows.map((row) => row.plug_type);
    return result;
  }

  async readAll(stationId) {
    // Construire et exécuter la requête SQL
    const where = stationId ? " where station_id = ?" : "";
    const sqlValues = stationId ? [stationId] : [];
    const [rows] = await this.database.query(this.baseSql + where, sqlValues);

    // Regrouper les résultats par borne (chaque borne a une liste de prises)
    const result = {};
    rows.forEach((row) => {
      if (!result[row.id]) {
        result[row.id] = { ...row, plug_type: [] };
      }
      result[row.id].plug_type.push(row.plug_type);
    });

    // Transformer l'objet "result" en tableau "array"
    const array = Object.values(result);
    return array;
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
