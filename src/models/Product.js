const { DataTypes, Model, Sequelize } = require("sequelize");

const sequelize = new Sequelize("mosbatsabz", "myuser2", "1141376#$", {
  host: "localhost",
  dialect:
    "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

const Product = sequelize.define(
  "Product",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    export_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "products",
    schema: "products",
  }
);

Product.createIfNotExist = function (values) {
  return Product.findOne({ where: values }).then(function (result) {
    if (!result) {
      return Product.create(values);
    }
    return Promise.resolve(result);
  });
};

exports.Product = Product;
