const { Sequelize } = require("sequelize");

class Database {
  #sequelize = null;

  constructor() {
    this.#sequelize = new Sequelize("mosbatsabz", "myuser2", "1141376#$", {
      host: "localhost",
      dialect:
        "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    });

    this.testConnection();
  }

  async testConnection() {
    try {
      await this.#sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  getConnection() {
    return this.#sequelize;
  }
}

exports.Database = Database;
