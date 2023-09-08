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
exports.create_new_staff = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

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

// Add new member
exports.add_new_member = (req, res) => {
  const isActive = false;

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  const userType = req.body.userType;
  const status = isActive;

  (async () => {
    Member.findOne({
      where: {
        email: email,
      },
    }).then(async (member) => {
      if (member) {
        res.json({ message: "A Member with that email already exists" });
      }
      await Member.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        userType: userType,
        status: status,
      });
      res.status(200).json({ message: "member added successfully" });
    });
  })();
};
