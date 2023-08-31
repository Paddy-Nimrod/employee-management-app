const express = require("express");
const user_controllers = require("../controllers/userController");

const router = express.Router();

router.get("/get_members", user_controllers.get_all_members);
router.post("/add_new_staff", user_controllers.createStaff);

module.exports = router;
