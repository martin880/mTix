const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movieController;

// get
router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);

// insert
router.post("/", movieController.insertMovie);

// update
router.patch("/:id", movieController.editMovie);

// delete
router.delete("/:id", movieController.deleteMovie);
module.exports = router;
