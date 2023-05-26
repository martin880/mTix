const express = require("express");
const router = express.Router();
const { fileUploader, upload } = require("../middlewares/multer");
const movieController = require("../controllers").movieController;

// get
router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);

// insert
// router.post("/v1", movieController.insertMovie);
router.post(
	"/v1",
	fileUploader({
		destinationFolder: "movie",
	}).single("img_url"),
	movieController.insertMovie
);

// update
router.patch("/v2/:id", movieController.editMovie);

// delete
router.delete("/v3/:id", movieController.deleteMovie);

module.exports = router;
