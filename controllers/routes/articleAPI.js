const router = require("express").Router();
const articleController = require("../articleController")

// Matches with "/api/meetings" (check server.js line 19)
router.route("/")
  .get(articleController.findAll) // get all meetings
  .post(articleController.create) // create a meeting

router.route("/:id")
  .get(articleController.findById) // get a meeting by id
  .put(articleController.update) // update a meeting by id
  .delete(articleController.delete) // delete a meeting by id

module.exports = router;