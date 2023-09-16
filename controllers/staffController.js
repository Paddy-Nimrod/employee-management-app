const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");

const Staff = require("../models/staff")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create staff method
exports.create_new_staff = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const saltRounds = 10;

  Staff.findOne({ where: { email: email } }).then((staff) => {
    if (staff) {
      res.send({ message: "account with that email already exists" });
    } else {
      (async () => {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPass = await bcrypt.hash(password, salt);
        await Staff.create({ email: email, password: hashedPass });
        res.status(200).send({ message: "Staff added successfully" });
      })();
    }
  });
};

//login staff method
exports.login_staff = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Staff.findOne({ where: { email: email } }).then((staff) => {
    if (staff) {
    }
  });
};
