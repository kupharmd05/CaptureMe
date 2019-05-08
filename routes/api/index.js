const router = require("express").Router();
const vCardRoutes = require("./vcard");


// Contact routes


router.use("/vcard", vCardRoutes);

module.exports = router;