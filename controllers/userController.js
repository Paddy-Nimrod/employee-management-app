const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");

const Member = require("../models/member")(sequelize, DataTypes);
const Staff = require("../models/staff")(sequelize, DataTypes);
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.get_all_members = (req, res) => {
  Member.findAll()
    .then((members) => {
      res.status(200).json(members);
    })
    .catch();
};

exports.createStaff = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Staff.findAll({ where: { email: email } }).then((user) => {
    if (user) {
      res.send({ message: "account with that email already exists" });
    }
    (async () => {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPass = bcrypt.hash(password, salt);
      await Staff.create({ email: email, password: hashedPass });
      res.status(200).send({ message: "Staff added successfully" });
    })();
  });
};
