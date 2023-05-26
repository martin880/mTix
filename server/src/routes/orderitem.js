const express = require("express");
const router = express.Router();
const orderitemController = require("../controllers").orderitemController;

// get
router.get("/", orderitemController.getAll);
router.get("/:id", orderitemController.getById);

// insert
router.post("/", orderitemController.insertOrderitems);

// update
router.patch("/:id", orderitemController.editOrderitems);

// delete
router.delete("/:id", orderitemController.deleteOrderitems);

module.exports = router;
