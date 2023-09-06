const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");

const Member = require("../models/member")(sequelize, DataTypes);
const Staff = require("../models/staff")(sequelize, DataTypes);
const bcrypt = require("bcrypt");

const saltRounds = 10;

//get all members method
exports.get_all_members = (req, res) => {
  Member.findAll()
    .then((members) => {
      res.status(200).json(members);
    })
    .catch((error) => {
      console.log(`an error occured ${error}`);
    });
};

//create staff method
exports.create_staff = (req, res, next) => {
  console.log("add member controller called");
  const email = req.body.email;
  const password = req.body.password;

  Staff.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      res.send({ message: "account with that email already exists" });
    } else {
      (async () => {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPass = bcrypt.hash(password, salt);
        console.log(email + hashedPass);
        await Staff.create({ email: email, password: hashedPass });
        res.status(200).send({ message: "Staff added successfully" });
      })();
    }
  });
};
