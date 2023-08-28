"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.hasMany(models.Event);
      Payment.hasMany(models.Donation);
      Payment.belongsTo(models.Member);
    }
  }
  Payment.init(
    {
      date: DataTypes.DATE,
      amount: DataTypes.DOUBLE,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "done"],
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
