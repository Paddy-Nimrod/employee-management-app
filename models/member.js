"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Member.belongsTo(models.Staff);
      Member.hasMany(models.Event);
      Member.hasMany(models.Payment);
    }
  }
  Member.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      userType: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Member",
    }
  );
  return Member;
};
