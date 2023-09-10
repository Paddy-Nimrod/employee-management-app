const express = require("express");
const member_controller = require("../controllers/member_controller");

const router = express.Router();

router.get("/get_members", member_controller.get_all_members);
router.post("/add_new_member", member_controller.add_new_member);

module.exports = router;
