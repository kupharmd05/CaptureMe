const router = require("express").Router();
const contactRoutes = require("./contacts");

// Contact routes
router.use("/contacts", contactRoutes);

module.exports = router;