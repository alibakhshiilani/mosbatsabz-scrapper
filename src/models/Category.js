const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mosbatsabz", "myuser2", "1141376#$", {
  host: "localhost",
  dialect:
    "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

const Category = sequelize.define(
  "Category",
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
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

Category.createIfNotExist = function (values) {
  return Category.findOne({
    where: {
      title: values.title,
    },
  }).then(function (result) {
    if (!result) {
      return Category.create(values);
    }
    return Promise.resolve(result);
  });
};

exports.Category = Category;
