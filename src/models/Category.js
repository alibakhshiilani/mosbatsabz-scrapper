const { Sequelize, DataTypes } = require("sequelize");
const { Database } = require("../modules/Database/Database");
const sequelize = new Database().getConnection();

const Category = sequelize.define(
  "Category",
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      // allowNull defaults to true
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "categories",
    schema: "categories",
  }
);

exports.Category = Category;
