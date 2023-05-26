const express = require("express");
const router = express.Router();
const cityController = require("../controllers").cityController;

// get
router.get("/", cityController.getAll);
router.get("/:id", cityController.getById);

// insert
router.post("/", cityController.insertCity);

// update
router.patch("/:id", cityController.editCity);

// delete
router.delete("/:id", cityController.deleteCity);

module.exports = router;
