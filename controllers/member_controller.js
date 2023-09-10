const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");

const Member = require("../models/member")(sequelize, DataTypes);

//get all members method
exports.get_all_members = (req, res) => {
  Member.findAll({ include: Staff })
    .then((members) => {
      res.status(200).json(members);
    })
    .catch((error) => {
      console.log(`an error occured ${error}`);
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
