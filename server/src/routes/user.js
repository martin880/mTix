const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

// get
router.get("/", userController.getAll);
router.get("/:id", userController.getById);

// insert // register
router.post("/", userController.insertUserV1);

// update
router.patch("/:id", userController.editUser);

// delete
router.delete("/:id", userController.deleteUser);

module.exports = router;
