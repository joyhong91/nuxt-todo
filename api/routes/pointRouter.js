const express = require("express");
const router = express.Router();
const pointController = require("../controllers/pointController");

router.post('/createPoint', pointController.createPoint);
router.get("/getPointByUserId", pointController.getPointByUserId);
router.patch("/updatePoint", pointController.updatePoint);
router.patch("/resetPoint", pointController.resetPoint);


module.exports = router;
