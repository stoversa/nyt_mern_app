const router = require("express").Router();
const noteController = require("../noteController")

// Matches with "/api/meetings" (check server.js line 19)
router.route("/")
  .get(noteController.findAll) // get all meetings
  .post(noteController.create) // create a meeting

router.route("/:id")
  .get(noteController.findById) // get a meeting by id
  .put(noteController.update) // update a meeting by id
  .delete(noteController.delete) // delete a meeting by id

module.exports = router;