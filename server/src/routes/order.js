const express = require("express");
const router = express.Router();
const orderController = require("../controllers").orderController;

// get
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);

// insert
router.post("/", orderController.insertOrder);

// update
router.patch("/:id", orderController.editOrder);

// delete
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
