const router = require("express").Router();
const contactRoutes = require("./contacts");
const vCardRoutes = require("./vcard");


// Contact routes
router.use("/contacts", contactRoutes);

router.use("/vcard", vCardRoutes);

module.exports = router;