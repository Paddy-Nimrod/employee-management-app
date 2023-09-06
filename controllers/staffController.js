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

// exports.create_new_staff = (req, res) => {
//   res.json({ message: "New staff added" });
// };

//create staff method
exports.create_new_staff = (req, res, next) => {
  console.log("add member controller called");
  const email = req.body.email;
  const password = req.body.password;

  console.log(email + password);

  Staff.findOne({ where: { email: req.body.email } }).then((staff) => {
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

// Add new member
exports.add_new_member = (req, res) => {
  res.json({ message: "okay" });
};
