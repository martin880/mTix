const express = require("express");
const router = express.Router();
const ticketController = require("../controllers").ticketController;

// get
router.get("/", ticketController.getAll);
router.get("/:id", ticketController.getById);

// insert
router.post("/", ticketController.insertTicket);

// update
router.patch("/:id", ticketController.editTicket);

// delete
router.delete("/:id", ticketController.deleteTicket);

module.exports = router;
