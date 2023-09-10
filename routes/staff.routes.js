const express = require("express");
const staff_controller = require("../controllers/staffController");

const router = express.Router();

router.get("/get_all_staff", staff_controller.get_all_staff);
router.post("/add_new_staff", staff_controller.create_new_staff);

module.exports = router;
