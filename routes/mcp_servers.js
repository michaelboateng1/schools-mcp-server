const express = require("express");
const shiningVesselsMCP = require("../controllers/shining_vessels_controller");
const ceemaEaglesMCP = require("../controllers/ceema_eagles_controller");
const test = require("../controllers/test_controller");

const router = express.Router();


router.post('/shining-vessels-mcp', shiningVesselsMCP)
router.post('/ceema-eagles-mcp', ceemaEaglesMCP)
router.get("/test", test)

module.exports = router;