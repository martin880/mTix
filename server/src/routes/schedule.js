const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers").scheduleController;

// get
router.get("/", scheduleController.getAll);
router.get("/:id", scheduleController.getById);

// insert
router.post("/", scheduleController.insertSchedule);

// update
router.patch("/:id", scheduleController.editSchedule);

// delete
router.delete("/:id", scheduleController.deleteSchedule);

module.exports = router;
