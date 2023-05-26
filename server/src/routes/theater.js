const express = require("express");
const router = express.Router();
const theaterController = require("../controllers").theaterController;

// get
router.get("/", theaterController.getAll);
router.get("/:id", theaterController.getById);

// insert
router.post("/", theaterController.insertTheaters);

// update
router.patch("/:id", theaterController.editTheaters);

// delete
router.delete("/:id", theaterController.deleteTheaters);

module.exports = router;
