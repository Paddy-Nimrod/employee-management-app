const express = require("express");
const staff_controllers = require("../controllers/staffController");

const router = express.Router();

router.get("/get_members", staff_controllers.get_all_members);
router.post("/add_new_staff", staff_controllers.create_new_staff);
router.post("/add_new_member", staff_controllers.add_new_member);
router.get("/get_all_staff", staff_controllers.get_all_staff);

module.exports = router;
