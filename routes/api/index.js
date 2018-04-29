const router = require("express").Router();
const articleRoutes = require("./article");
const noteRoutes = require("./note");

// Book routes
router.use("/articles", articleRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
